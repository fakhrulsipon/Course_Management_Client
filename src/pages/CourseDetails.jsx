import React, { use, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import { motion } from "framer-motion";


const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = use(AuthContext);

  const [enrolled, setEnrolled] = useState(false);
  const [seats, setSeats] = useState(course.availableSeats || 0);
  const [loading, setLoading] = useState(false);

  // Review states
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // socket.io state
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  // Admin broadcast states
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [showBroadcastForm, setShowBroadcastForm] = useState(false);

  useEffect(() => {
    document.title = "Course Details | EduPath";
  }, []);

  // Socket connection setup
  useEffect(() => {
    const SERVER_URL = "https://coursemanagementserver-production.up.railway.app";
    
    const newSocket = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      timeout: 10000,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
      setIsConnected(true);
      setConnectionError(null);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
      setConnectionError('Connection failed. Please refresh the page.');
    });

    newSocket.on('reconnect', (attempt) => {
      console.log('Socket reconnected successfully', attempt);
      setIsConnected(true);
      setConnectionError(null);
      
      // Rejoin room after reconnection
      if (course?._id && user) {
        newSocket.emit("join_course_room", {
          courseId: course._id,
          userEmail: user.email,
          userRole: userRole,
        });
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Course room join
  useEffect(() => {
    if (socket && course?._id && user && isConnected) {
      try {
        socket.emit("join_course_room", {
          courseId: course._id,
          userEmail: user.email,
          userRole: userRole,
        });

        fetchCourseMessages();

        const handleReceiveMessage = (messageData) => {
          setMessages((prev) => {
            if (prev.some(msg => msg._id === messageData._id)) {
              return prev;
            }
            return [...prev, messageData];
          });
        };

        const handleMessageDeleted = (messageId) => {
          setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
        };

        socket.on("receive_message", handleReceiveMessage);
        socket.on("message_deleted", handleMessageDeleted);

        return () => {
          socket.off("receive_message", handleReceiveMessage);
          socket.off("message_deleted", handleMessageDeleted);
        };
      } catch (error) {
        console.error("Error joining course room:", error);
      }
    }
  }, [socket, course?._id, user, userRole, isConnected]);

  // Fetch messages
  const fetchCourseMessages = async () => {
    if (!user?.accessToken) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://coursemanagementserver-production.up.railway.app/course-messages/${course._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          timeout: 10000,
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Please login again to continue",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !user || !socket || !isConnected) {
      if (!isConnected) {
        Swal.fire({
          icon: "warning",
          title: "Connection Lost",
          text: "Please wait while we reconnect...",
        });
      }
      return;
    }

    const messageData = {
      courseId: course._id,
      userEmail: user.email,
      userName: user.displayName || "User",
      userPhoto: user.photoURL,
      message: newMessage.trim(),
    };

    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  // Admin broadcast
  const handleAdminBroadcast = async (e) => {
    e.preventDefault();

    if (!broadcastMessage.trim() || !user || userRole !== "admin") return;

    const messageData = {
      courseId: course._id,
      userEmail: user.email,
      userName: user.displayName || "Admin",
      userPhoto: user.photoURL,
      message: broadcastMessage.trim(),
      isAdminMessage: true,
      toUser: null,
    };

    try {
      const response = await axios.post(
        "https://coursemanagementserver-production.up.railway.app/admin/send-message",
        messageData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        setBroadcastMessage("");
        setShowBroadcastForm(false);
        Swal.fire({
          icon: "success",
          title: "Broadcast Sent!",
          text: "Your message has been broadcast to all users.",
        });
      }
    } catch (error) {
      console.error("Error sending admin message:", error);
      Swal.fire({
        icon: "error",
        title: "Broadcast Failed",
        text: error.response?.data?.error || "Failed to send broadcast message",
      });
    }
  };

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      try {
        const cachedRole = localStorage.getItem(`userRole_${user.email}`);
        if (cachedRole) {
          setUserRole(cachedRole);
        } else {
          const response = await axios.get(
            `https://coursemanagementserver-production.up.railway.app/user-role/${user.email}`,
            { timeout: 5000 }
          );
          const role = response.data.userRole;
          setUserRole(role);
          localStorage.setItem(`userRole_${user.email}`, role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("user");
      }
    };
    fetchUserRole();
  }, [user]);

  // Delete message
  const handleDeleteMessage = async (messageId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://coursemanagementserver-production.up.railway.app/course-messages/${messageId}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
            timeout: 5000,
          }
        );

        setMessages((prev) => prev.filter((msg) => msg._id !== messageId));

        Swal.fire("Deleted!", "Your message has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.response?.data?.error || "Failed to delete message",
      });
    }
  };

  // Check enrollment
  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://coursemanagementserver-production.up.railway.app/check-enroll?email=${user.email}&courseId=${course._id}`,
          { timeout: 5000 }
        )
        .then((res) => {
          setEnrolled(res.data.enrolled);
        })
        .catch((err) => {
          console.error("Error checking enrollment:", err);
        });
    }
  }, [user, course._id]);

  // Fetch reviews
  useEffect(() => {
    axios
      .get(`https://coursemanagementserver-production.up.railway.app/reviews?courseId=${course._id}`, { timeout: 5000 })
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });

    axios
      .get(`https://coursemanagementserver-production.up.railway.app/reviews/average?courseId=${course._id}`, { timeout: 5000 })
      .then((res) => {
        setAverageRating(res.data.averageRating);
        setTotalReviews(res.data.totalReviews);
      })
      .catch((err) => {
        console.error("Error fetching average rating:", err);
      });
  }, [course._id]);

  // Enrollment toggle
  const handleEnrollToggle = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const { data } = await axios.post("https://coursemanagementserver-production.up.railway.app/enroll", {
        email: user.email,
        courseId: course._id,
      }, { timeout: 10000 });

      if (data.message === "Enrollment removed successfully") {
        setEnrolled(false);
        setSeats((prev) => prev + 1);
      }

      if (data.message === "Enrolled successfully") {
        setEnrolled(true);
        setSeats((prev) => prev - 1);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to be logged in to submit a review.",
      });
      return;
    }

    if (!rating) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please select a rating for your review.",
      });
      return;
    }

    if (!comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Comment Required",
        text: "Please write a comment for your review.",
      });
      return;
    }

    try {
      const { data } = await axios.post("https://coursemanagementserver-production.up.railway.app/reviews", {
        courseId: course._id,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        rating,
        comment: comment.trim(),
      }, { timeout: 10000 });

      if (data.success) {
        setReviews((prev) => [data.review, ...prev]);

        const avgRes = await axios.get(
          `https://coursemanagementserver-production.up.railway.app/reviews/average?courseId=${course._id}`
        );
        setAverageRating(avgRes.data.averageRating);
        setTotalReviews(avgRes.data.totalReviews);

        setRating(0);
        setComment("");

        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Thank you for your feedback!",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.response?.data?.message || "Failed to submit review",
      });
    }
  };

  // Connection Status Component
  const ConnectionStatus = () => (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
      isConnected 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      <div className={`w-2 h-2 rounded-full animate-pulse ${
        isConnected ? 'bg-green-500' : 'bg-red-500'
      }`}></div>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );

  // Star component
  const Star = ({
    size,
    filled,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className = "",
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`cursor-pointer transition-colors duration-200 ${className} ${
        filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
      }`}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Course Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            {course.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your skills with this comprehensive course designed for modern learners
          </p>
        </motion.div>

        {/* Main Course Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-16 border border-white/20 dark:border-gray-700/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Section */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>

                {/* Rating Badge */}
                {averageRating > 0 && (
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            filled={i < Math.floor(averageRating)}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                {/* Course Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-xl border border-cyan-500/20">
                    <span className="font-semibold">Duration:</span> {course.duration}
                  </div>
                  <div className="bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl border border-green-500/20">
                    <span className="font-semibold">Seats:</span> {seats > 0 ? seats : "Full"}
                  </div>
                  <div className="bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-xl border border-purple-500/20">
                    <span className="font-semibold">Price:</span> {course.price}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Course Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {course.description}
                  </p>
                </div>

                {/* Posted Date */}
                <div className="text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Posted on:</span>{" "}
                  {new Date(course.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                {/* Enroll Button */}
                <div className="pt-4">
                  {seats > 0 || enrolled ? (
                    <button
                      onClick={handleEnrollToggle}
                      disabled={!user || loading}
                      className={`px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 ${
                        enrolled
                          ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : enrolled ? (
                        "Unenroll from Course"
                      ) : (
                        "Enroll Now"
                      )}
                    </button>
                  ) : (
                    <div className="bg-red-500/10 text-red-600 dark:text-red-400 px-6 py-4 rounded-2xl border border-red-500/20 text-center">
                      <span className="font-semibold">Course Full</span>
                      <p className="text-sm mt-1">
                        No seats available at the moment
                      </p>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/30">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">
                    🚀 Why Join This Course?
                  </h3>
                  <ul className="space-y-2 text-blue-600 dark:text-blue-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Learn from industry-leading instructors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Hands-on projects & real-world scenarios
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Lifetime access to all course materials
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Boost your career with recognized certification
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
              Student Reviews
            </h2>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-600 dark:text-cyan-400">
                  {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
                </div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      filled={star <= Math.round(averageRating)}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Review Form */}
            <div className="xl:col-span-1">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Share Your Experience
                </h3>

                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  {/* Rating Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Your Rating *
                    </label>
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star size={36} filled={(hover || rating) >= star} />
                        </button>
                      ))}
                    </div>
                    <div className="text-center mt-3">
                      <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                        {rating > 0 ? `${rating} out of 5` : "Select your rating"}
                      </span>
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Your Review *
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us about your experience with this course. What did you like? What could be improved?"
                      className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-200 backdrop-blur-sm"
                      rows="4"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!rating || !comment.trim()}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Submit Review
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Your review will help other students make better decisions
                  </p>
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="xl:col-span-2">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    What Students Are Saying
                  </h3>
                  <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-500/20">
                    {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                  </span>
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      No Reviews Yet
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Be the first to share your experience with this course!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review._id || index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-600/20"
                      >
                        <div className="flex items-start gap-4">
                          {/* User Avatar */}
                          <img
                            src={review.userPhoto || "/default-avatar.png"}
                            alt={review.userName || review.userEmail}
                            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/20"
                          />

                          <div className="flex-1 min-w-0">
                            {/* User Info and Rating */}
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-bold text-gray-800 dark:text-white text-lg">
                                  {review.userName || review.userEmail.split("@")[0]}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                  {review.userEmail}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      size={16}
                                      filled={star <= review.rating}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                                  {review.rating}.0
                                </span>
                              </div>
                            </div>

                            {/* Review Date */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                              {new Date(review.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>

                            {/* Review Comment */}
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              "{review.comment}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Discussion Forum Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-gray-700/20"
        >
          {/* Connection Status Alert */}
          {connectionError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2 text-red-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{connectionError}</span>
              </div>
            </div>
          )}

          {/* Admin Broadcast Section */}
          {userRole === "admin" && (
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-purple-500/10 rounded-2xl border border-purple-500/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-base md:text-lg font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                  <span className="text-lg">📢</span>
                  Admin Broadcast Tool
                </h3>
                <button
                  onClick={() => setShowBroadcastForm(!showBroadcastForm)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-xl text-sm transition-colors w-full sm:w-auto"
                >
                  {showBroadcastForm ? "Hide Broadcast" : "Show Broadcast"}
                </button>
              </div>

              {showBroadcastForm && (
                <form onSubmit={handleAdminBroadcast} className="mt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      placeholder="Type your broadcast message to all users..."
                      className="flex-1 px-4 py-3 border border-purple-300 dark:border-purple-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm text-sm md:text-base"
                    />
                    <button
                      type="submit"
                      disabled={!broadcastMessage.trim()}
                      className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 md:px-6 md:py-3 rounded-xl font-semibold transition-colors text-sm md:text-base"
                    >
                      Broadcast
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-purple-600 dark:text-purple-400 mt-2">
                    This message will be visible to all users in this course.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white text-center sm:text-left">
              Course Discussion Forum
            </h2>
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <ConnectionStatus />
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:bg-gray-400 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none text-sm md:text-base font-semibold shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : isChatOpen ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Hide Chat
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Show Chat
                  </span>
                )}
              </button>
            </div>
          </div>

          {isChatOpen && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Chat Messages Section */}
              <div className="lg:col-span-3 space-y-4 md:space-y-6">
                {/* Messages Container */}
                <div className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 h-80 md:h-96 overflow-y-auto border border-gray-200/50 dark:border-gray-600/50">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 h-full flex flex-col items-center justify-center">
                      <div className="text-4xl md:text-6xl mb-3 md:mb-4">
                        💬
                      </div>
                      <p className="text-base md:text-lg font-medium mb-2">
                        No messages yet
                      </p>
                      <p className="text-sm md:text-base opacity-75">
                        Start the conversation!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 md:space-y-4">
                      {messages.map((msg, index) => (
                        <div
                          key={msg._id || index}
                          className={`flex items-start gap-2 md:gap-3 ${
                            msg.userEmail === user?.email
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >
                          {/* User Avatar */}
                          <div className="flex-shrink-0 relative">
                            <img
                              src={msg.userPhoto || "/default-avatar.png"}
                              alt={msg.userName}
                              className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-cyan-500/20"
                            />
                            {msg.isAdminMessage && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full border-2 border-white dark:border-gray-700 flex items-center justify-center">
                                <span className="text-[8px] md:text-xs text-white">
                                  A
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3 md:p-4 relative group ${
                              msg.userEmail === user?.email
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none"
                                : msg.isAdminMessage
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-bl-none"
                                : "bg-white dark:bg-gray-600 text-gray-800 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-500"
                            }`}
                          >
                            {/* Admin Badge */}
                            {msg.isAdminMessage && (
                              <div className="flex items-center gap-1 mb-1">
                                <span className="text-xs text-purple-200 font-medium">
                                  📢 Admin
                                </span>
                              </div>
                            )}

                            {/* Delete Button */}
                            {(userRole === "admin" ||
                              msg.userEmail === user?.email) && (
                              <button
                                onClick={() => handleDeleteMessage(msg._id)}
                                className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                                title="Delete message"
                              >
                                ×
                              </button>
                            )}

                            {/* User Info and Time */}
                            <div className="flex items-center justify-between mb-1 md:mb-2 gap-2">
                              <span
                                className={`font-semibold text-xs md:text-sm truncate ${
                                  msg.userEmail === user?.email
                                    ? "text-white"
                                    : msg.isAdminMessage
                                    ? "text-purple-100"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {msg.userName}
                                {userRole === "admin" && (
                                  <span className="text-xs opacity-70 ml-1 hidden md:inline">
                                    ({msg.userEmail})
                                  </span>
                                )}
                              </span>
                              <span
                                className={`text-xs flex-shrink-0 ${
                                  msg.userEmail === user?.email
                                    ? "text-cyan-100"
                                    : msg.isAdminMessage
                                    ? "text-purple-200"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {new Date(msg.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>

                            {/* Message Content */}
                            <p className="text-sm md:text-base break-words leading-relaxed">
                              {msg.message}
                            </p>

                            {/* Recipient Info (Admin Only) */}
                            {msg.toUser && userRole === "admin" && (
                              <div className="text-xs text-blue-200 mt-1 md:mt-2 pt-1 border-t border-blue-300/30">
                                To: {msg.toUser}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Input Form */}
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={
                          !isConnected
                            ? "Connecting..."
                            : userRole === "admin"
                            ? "Type your broadcast message..."
                            : "Type your message..."
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm text-sm md:text-base pr-20 disabled:opacity-50"
                        disabled={!user || !isConnected}
                      />
                      {userRole === "admin" && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full border border-purple-300">
                            Admin
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || !user || !isConnected}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 md:px-6 md:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none text-sm md:text-base shadow-lg flex items-center justify-center gap-2 min-w-[80px]"
                    >
                      {userRole === "admin" ? (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                            />
                          </svg>
                          <span className="hidden sm:inline">Broadcast</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          <span className="hidden sm:inline">Send</span>
                        </>
                      )}
                      <span className="sm:hidden">
                        {userRole === "admin" ? "Broadcast" : "Send"}
                      </span>
                    </button>
                  </div>

                  {/* Helper Text */}
                  <div className="space-y-1">
                    {!user && (
                      <p className="text-xs md:text-sm text-red-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Please login to participate in discussion
                      </p>
                    )}
                    {!isConnected && (
                      <p className="text-xs md:text-sm text-yellow-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Connecting to chat server...
                      </p>
                    )}
                    {userRole === "admin" && isConnected && (
                      <p className="text-xs md:text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <span className="text-sm">💡</span>
                        Your messages will be broadcast to all users
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Online Users Sidebar - Admin Only */}
              {userRole === "admin" && (
                <div className="lg:col-span-1">
                  <div className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-200/50 dark:border-gray-600/50">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Active Participants (
                      {
                        messages.filter(
                          (msg, index, self) =>
                            index ===
                            self.findIndex((m) => m.userEmail === msg.userEmail)
                        ).length
                      }
                      )
                    </h3>
                    <div className="space-y-2 md:space-y-3 max-h-60 overflow-y-auto">
                      {messages
                        .filter(
                          (msg, index, self) =>
                            index ===
                            self.findIndex((m) => m.userEmail === msg.userEmail)
                        )
                        .map((userMsg, index) => (
                          <div
                            key={userMsg.userEmail || index}
                            className="flex items-center gap-2 md:gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-600/50"
                          >
                            <div className="relative">
                              <img
                                src={userMsg.userPhoto || "/default-avatar.png"}
                                alt={userMsg.userName}
                                className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-green-500/50"
                              />
                              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block truncate">
                                {userMsg.userName}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">
                                {userMsg.userEmail}
                              </span>
                            </div>
                          </div>
                        ))}
                      {messages.filter(
                        (msg, index, self) =>
                          index ===
                          self.findIndex((m) => m.userEmail === msg.userEmail)
                      ).length === 0 && (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                          <p className="text-sm">No active participants</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetails;