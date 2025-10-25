import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const ManageMessages = () => {
  const { user } = use(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  
  
  const [usersInCourse, setUsersInCourse] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  // Improved Socket connection setup
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
      if (selectedCourse && userRole === 'admin') {
        newSocket.emit('join_course_room', {
          courseId: selectedCourse,
          userEmail: user.email,
          userRole: 'admin'
        });
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // User role fetch
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      try {
        const response = await axios.get(
          `https://coursemanagementserver-production.up.railway.app/user-role/${user.email}`
        );
        setUserRole(response.data.userRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, [user]);

  // Admin check
  useEffect(() => {
    if (userRole && userRole !== 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only administrators can access this page.',
      });
    }
  }, [userRole]);


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://coursemanagementserver-production.up.railway.app/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  
  const fetchUsersInCourse = async (courseId) => {
    try {
      const response = await axios.get(
        `https://coursemanagementserver-production.up.railway.app/course-users/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          timeout: 10000,
        }
      );
      setUsersInCourse(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCourseMessages = async (courseId) => {
    try {
      const response = await axios.get(
        `https://coursemanagementserver-production.up.railway.app/admin/course-messages/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          timeout: 10000,
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch messages',
      });
    }
  };

  // Improved Real-time messages handling
  useEffect(() => {
    if (socket && isConnected) {
      const handleReceiveMessage = (messageData) => {
        if (messageData.courseId === selectedCourse) {
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(msg => msg._id === messageData._id)) {
              return prev;
            }
            return [...prev, messageData];
          });
        }
      };

      const handleMessageDeleted = (messageId) => {
        setMessages(prev => prev.filter((msg) => msg._id !== messageId));
      };

      socket.on('receive_message', handleReceiveMessage);
      socket.on('message_deleted', handleMessageDeleted);

      return () => {
        socket.off('receive_message', handleReceiveMessage);
        socket.off('message_deleted', handleMessageDeleted);
      };
    }
  }, [socket, selectedCourse, isConnected]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedCourse) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please select a course and enter a message.',
      });
      return;
    }

    if (!isConnected) {
      Swal.fire({
        icon: 'warning',
        title: 'Connection Lost',
        text: 'Please wait while we reconnect...',
      });
      return;
    }

    try {
      const messageData = {
        courseId: selectedCourse,
        userEmail: user.email,
        userName: user.displayName || 'Admin',
        userPhoto: user.photoURL,
        message: newMessage.trim(),
        toUser: selectedUser || null,
      };

      // API call to send message
      const response = await axios.post(
        'https://coursemanagementserver-production.up.railway.app/admin/send-message',
        messageData,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        setNewMessage('');
        setSelectedUser('');
        
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: `Your message has been sent ${selectedUser ? 'to ' + selectedUser : 'to all users'}.`,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Send Failed',
        text: error.response?.data?.error || 'Failed to send message',
      });
    }
  };

  // Improved Course selection handling
  useEffect(() => {
    if (socket && selectedCourse && userRole === 'admin' && isConnected) {
      socket.emit('join_course_room', {
        courseId: selectedCourse,
        userEmail: user.email,
        userRole: 'admin'
      });
      
    
      fetchUsersInCourse(selectedCourse);
    }
  }, [socket, selectedCourse, userRole, user, isConnected]);

  // ফিল্টার করা মেসেজ (শুধুমাত্র selectedUser এর মেসেজ দেখাবে)
  const filteredMessages = selectedUser 
    ? messages.filter(msg => 
        msg.userEmail === selectedUser || 
        msg.toUser === selectedUser ||
        (msg.isAdminMessage && !msg.toUser)
      )
    : messages;

  //Connection Status Component
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

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">Only administrators can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 
                    dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-800
                    relative py-8">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/30 to-transparent dark:via-gray-800/10 animate-pulse"></div>
        
        {/* Floating dots - Light mode only */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce dark:hidden"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-300 dark:hidden"></div>
        <div className="absolute bottom-40 left-60 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-700 dark:hidden"></div>
        
        {/* Dark mode floating stars */}
        <div className="hidden dark:block absolute top-20 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="hidden dark:block absolute top-40 right-40 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse delay-500"></div>
        <div className="hidden dark:block absolute bottom-40 left-60 w-1 h-1 bg-indigo-300 rounded-full animate-pulse delay-1000"></div>
        
        {/* Gradient blobs - Light mode */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-3xl dark:hidden"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 blur-3xl dark:hidden"></div>
        
        {/* Dark mode subtle blobs */}
        <div className="hidden dark:block absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-900/30 to-indigo-900/20 rounded-full blur-3xl"></div>
        <div className="hidden dark:block absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-900/20 to-gray-900/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent 
                        dark:from-blue-400 dark:to-cyan-400 mb-4">
            Manage Course Messages
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Communicate with students and manage course messages efficiently
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex justify-center mb-6">
          <ConnectionStatus />
        </div>

        {/* Connection Error Alert */}
        {connectionError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 text-red-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{connectionError}</span>
            </div>
          </div>
        )}
        
        {/* Course Selection Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 
                      dark:border-gray-700/50 p-6 mb-8 transition-all duration-300 hover:shadow-3xl">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
              📚
            </span>
            Select Course
          </h2>
          <select 
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedUser('');
              if (e.target.value) {
                fetchCourseMessages(e.target.value);
              } else {
                setMessages([]);
                setUsersInCourse([]);
              }
            }}
            className="w-full p-4 bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 
                     rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                     backdrop-blur-sm transition-all duration-300"
          >
            <option value="" className="text-gray-500">Select a course...</option>
            {courses.map(course => (
              <option key={course._id} value={course._id} className="text-gray-800 dark:text-white">
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
              {/* Users List - Sidebar */}
              <div className="xl:col-span-1">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl 
                              border border-white/20 dark:border-gray-700/50 p-6 h-full transition-all duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                      👥
                    </span>
                    Users in Course
                  </h2>
                  
                  {/* All Users Option */}
                  <div 
                    className={`p-4 mb-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                      !selectedUser 
                        ? 'bg-blue-50/80 dark:bg-blue-900/30 border-blue-500/50 shadow-lg' 
                        : 'bg-gray-50/50 dark:bg-gray-800/50 border-transparent hover:border-gray-300/50 dark:hover:border-gray-600/50'
                    }`}
                    onClick={() => setSelectedUser('')}
                  >
                    <div className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <span className="text-blue-500">👥</span>
                      All Users
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View all messages</p>
                  </div>

                  {/* Individual Users */}
                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {usersInCourse.length === 0 ? (
                      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-2">😴</div>
                        No users found
                      </div>
                    ) : (
                      usersInCourse.map(user => (
                        <div 
                          key={user.email}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                            selectedUser === user.email 
                              ? 'bg-green-50/80 dark:bg-green-900/30 border-green-500/50 shadow-lg' 
                              : 'bg-gray-50/50 dark:bg-gray-800/50 border-transparent hover:border-gray-300/50 dark:hover:border-gray-600/50'
                          }`}
                          onClick={() => setSelectedUser(user.email)}
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.photoURL || '/default-avatar.png'} 
                              alt={user.name}
                              className="w-10 h-10 rounded-full border-2 border-white/50 shadow-sm"
                              onError={(e) => {
                                e.target.src = '/default-avatar.png';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-800 dark:text-white truncate">
                                {user.name || user.email.split('@')[0]}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Messages Display - Main Content */}
              <div className="xl:col-span-3">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl 
                              border border-white/20 dark:border-gray-700/50 p-6 h-full transition-all duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                        💬
                      </span>
                      {selectedUser ? `Messages with ${selectedUser}` : 'All Messages'}
                    </h2>
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {filteredMessages.length} messages
                    </span>
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar p-2">
                    {filteredMessages.length === 0 ? (
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <div className="text-6xl mb-4">💭</div>
                        <p className="text-lg">
                          {selectedUser 
                            ? `No messages found with ${selectedUser}`
                            : 'No messages found for this course.'
                          }
                        </p>
                        <p className="text-sm mt-2">Start a conversation!</p>
                      </div>
                    ) : (
                      filteredMessages.map(msg => (
                        <div 
                          key={msg._id} 
                          className={`p-5 rounded-2xl border-l-4 backdrop-blur-sm transition-all duration-300 ${
                            msg.userEmail === selectedUser 
                              ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' 
                              : msg.isAdminMessage 
                                ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/20'
                                : 'border-blue-500 bg-gray-50/50 dark:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                            <div className="flex items-center gap-3">
                              <img 
                                src={msg.userPhoto || '/default-avatar.png'} 
                                alt={msg.userName}
                                className="w-8 h-8 rounded-full border-2 border-white/50"
                                onError={(e) => {
                                  e.target.src = '/default-avatar.png';
                                }}
                              />
                              <div>
                                <span className="font-semibold text-gray-800 dark:text-white">
                                  {msg.userName}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                  ({msg.userEmail})
                                </span>
                                {msg.isAdminMessage && (
                                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                                    Admin
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                              {new Date(msg.timestamp).toLocaleString()}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-3 text-lg">{msg.message}</p>
                          
                          {msg.toUser && (
                            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                              <span className="font-medium">To:</span>
                              <span className="ml-1">{msg.toUser}</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Send Message Form */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl 
                          border border-white/20 dark:border-gray-700/50 p-6 transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  ✉️
                </span>
                {selectedUser ? `Send Message to ${selectedUser}` : 'Send Broadcast Message'}
              </h2>
              
              <form onSubmit={handleSendMessage}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Currently selected: 
                    <span className="ml-2 font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                      {selectedUser ? selectedUser : 'All Users (Broadcast)'}
                    </span>
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    {selectedUser 
                      ? 'This message will be sent only to the selected user.' 
                      : 'This message will be broadcast to all users in the course.'
                    }
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Your Message:
                  </label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={
                      selectedUser 
                        ? `Type your message to ${selectedUser}...` 
                        : 'Type your broadcast message to all users...'
                    }
                    className="w-full p-4 bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 
                             rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                             text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             backdrop-blur-sm transition-all duration-300 resize-none h-32"
                    required
                    disabled={!isConnected}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isConnected}
                  className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 
                           transform hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]
                           flex items-center justify-center gap-2 ${
                             isConnected
                               ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                               : 'bg-gray-400 cursor-not-allowed text-gray-200'
                           }`}
                >
                  <span>🚀</span>
                  {!isConnected 
                    ? 'Connecting...' 
                    : selectedUser 
                      ? 'Send to User' 
                      : 'Broadcast to All'
                  }
                </button>

                {!isConnected && (
                  <p className="text-sm text-yellow-600 text-center mt-3">
                    ⚠️ Please wait while we establish connection...
                  </p>
                )}
              </form>
            </div>
          </>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.3);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ManageMessages;