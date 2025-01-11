// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/', // Using environment variable for base URL
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Allow cookies to be sent along with requests (if needed)
//     timeout: 10000, // Set a timeout (e.g., 10 seconds)
// });

// // Add a request interceptor to include the token in the Authorization header
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken');
//         console.log('Token:', token);  // Log token to check if it exists and is valid

//         // Only add the Authorization header for requests that need it
//         if (token && config.url !== '/api/users/signup' && config.url !== '/api/users/signin') { 
//             // Exclude signup and signin from token requirement
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         console.log('Request config:', config);  // Log the request details (optional)

//         return config;
//     },
//     (error) => {
//         // Handle request error
//         console.error('Request error:', error);
//         return Promise.reject(error);
//     }
// );

// // Add a response interceptor to handle errors globally
// axiosInstance.interceptors.response.use(
//     (response) => {
//         // Log successful responses (optional)
//         console.log('Response:', response);
//         return response;
//     },
//     (error) => {
//         if (error.response) {
//             const { status, data } = error.response;

//             // Log error response data for better debugging
//             console.error('Error response data:', data);

//             // Handle specific HTTP status codes
//             switch (status) {
//                 case 401: // Unauthorized
//                     // Token might be invalid or expired, so log out the user
//                     localStorage.removeItem('authToken');
//                     // Redirect to login page (adjust based on your routing setup)
//                     window.location.href = '/signin'; // Ensure you adjust this for your routing
//                     break;
//                 case 403: // Forbidden
//                     // Handle the case where the user doesn't have permission to access the resource
//                     alert('You do not have permission to access this resource.');
//                     break;
//                 case 500: // Internal Server Error
//                     // More detailed logging for server errors
//                     alert(`Server error: ${data.message || 'Please try again later.'}`);
//                     break;
//                 default:
//                     alert(`An error occurred: ${status}. Please try again.`);
//                     break;
//             }
//         } else {
//             // If there's no response, handle network errors or timeouts
//             console.error('Error with no response:', error);
//             alert('Network error or request timeout. Please check your connection.');
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
// This would be ideally placed in a separate file like axiosInstance.js
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Create an Axios instance
const axiosInstance = axios.create();

// Request interceptor to attach JWT token to each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = cookies.get('Token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;

