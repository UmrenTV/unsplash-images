import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const storedDarkMode = localStorage.getItem("darkMode") === "true";

    if (storedDarkMode === null) {
        return prefersDarkMode;
    }
    return storedDarkMode || prefersDarkMode;
};
export const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
    const [searchQuery, setSearchQuery] = useState("cat");

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        localStorage.setItem("darkMode", newDarkTheme);
    };

    useEffect(() => {
        document.body.classList.toggle("dark-theme", isDarkTheme);
        // this is to check initially if isDarkTheme is set to true, to add the class to the body tag
    }, [isDarkTheme]);

    return (
        <AppContext.Provider
            value={{
                isDarkTheme,
                toggleDarkTheme,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => useContext(AppContext);
