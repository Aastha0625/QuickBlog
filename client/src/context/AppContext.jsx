// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// // Set base URL from environment (e.g., http://localhost:3000 or deployed URL)
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// // Create a new context instance to share global state
// const AppContext = createContext();

// // AppProvider will wrap your app and provide shared data (blogs, token, etc.)
// export const AppProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [token, setToken] = useState(null);       // JWT token for authenticated APIs
//   const [blogs, setBlogs] = useState([]);         // Fetched blog list
//   const [input, setInput] = useState("");         // Blog input data (title, desc, etc.)
//   const [loading, setLoading] = useState(true); // Loading state for async operations

//   useEffect(() => {
//   const storedToken = localStorage.getItem("token");
//   if (storedToken) {
//     setToken(storedToken);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//   }
//   setLoading(false);
// }, []);

  
//   const fetchBlogs = async () => {
//     try {
//       const { data } = await axios.get("/api/blog/all");
//       data.success ? setBlogs(data.blogs) : toast.error(data.message);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       toast.error("Failed to fetch blogs");
//     }
//   };

 
//   useEffect(() => {
//     fetchBlogs();
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []); 

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       localStorage.setItem('token', token);
//     } else {

//       delete axios.defaults.headers.common["Authorization"];
//       localStorage.removeItem('token');
//     }
//   }, [token]); 

//   const value = {
//     axios,
//     navigate,
//     token,
//     setToken, 
//     blogs,
//     setBlogs,
//     input,
//     setInput,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

// Set base URL from environment
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Create a new context instance to share global state
const AppContext = createContext();

// AppProvider will wrap your app and provide shared data (blogs, token, etc.)
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);       // JWT token for authenticated APIs
  const [blogs, setBlogs] = useState([]);         // Fetched blog list
  const [input, setInput] = useState("");         // Blog input data (title, desc, etc.)
  const [loading, setLoading] = useState(true);   // Loading state for async operations

  // Initialize token and axios headers on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Update axios headers whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Add axios interceptors for better error handling
  useEffect(() => {
    // Request interceptor to ensure token is always sent
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle authentication errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          setToken(null);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common["Authorization"];
          toast.error('Session expired. Please login again.');
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  // Fetch blogs function
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      if (data.success) {
        setToken(data.token);
        toast.success("Logged in successfully");
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    loading,
    setLoading,
    fetchBlogs,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);