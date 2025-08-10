import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme} className="btn btn-sm bg-base-300 border-2 border-cyan-400">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
};

export default ThemeToggle;