// import React, { useState } from 'react'

// const Login = () => {

// const [email,setEmail] = useState('');
// const [pass,setPass] = useState('');

// const handleSubmit =  async (e) => {
//     e.preventDefault();
// }

//   return (
//     <div className='flex items-center justify-center h-screen'>
//         <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
//             <div className='flex flex-col items-center justify-center'>
//                 <div className='w-full py-6 text-center'>
//                     <h1 className='text-3xl font-bold'><span className='text-primary'>
//                     Admin</span>Login</h1>
//                     <p className='font-ligt'>Enter your credentials to access the admin panel</p>
//                 </div>
                
//                 <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md
//                 text-gray-600'>
//                     <div className='flex flex-col'>
//                         <label>Email</label>
//                         <input onChange={e=> setEmail(e.target.value)} value={email} 
//                         type="email" required placeholder='Your emial id' 
//                         className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
//                     </div>
//                     <div className='flex flex-col'>
//                         <label>Password</label>
//                         <input onChange={e=> setPass(e.target.value)} value={pass}
//                         type="password" required placeholder='Your password' 
//                         className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
//                     </div>

//                     <button type='submit' className='w-full py-3 font-medium bg-primary
//                     text-white rounded cursor-pointer hover:bg-primary/90'>Login</button>
//                 </form>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext'; // Import AppContext
import { toast } from 'react-hot-toast'; // Import react-hot-toast

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Renamed for clarity
    const navigate = useNavigate();
    const { setToken } = useAppContext(); // Get the function to set the token globally

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request to your backend
            const {data} = await axios.post('/api/admin/login', {
                email,
                password,
            });
            console.log("Login response", data);

            if(data.success){
                setToken(data.token); // Update global state with the token
                localStorage.setItem('token', data.token); // Save token to localStorage
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Set token in Axios headers
                //navigate("/admin/dashboard");
            }
            else{
                toast.error(data.message || 'Login failed');
            }
            // const receivedToken = response.data.token;

            // if (receivedToken) {
            //     // Save token to localStorage and Axios headers
            //     localStorage.setItem('token', receivedToken);
            //     axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
                
            //     // Update global state
            //     setToken(receivedToken);

            //     toast.success('Login Successful!');
            //     navigate('/admin'); // Redirect to admin dashboard
            // }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'><span className='text-primary'>
                        Admin</span>Login</h1>
                        <p className='font-ligt'>Enter your credentials to access the admin panel</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                        <div className='flex flex-col'>
                            <label>Email</label>
                            <input onChange={e => setEmail(e.target.value)} value={email} 
                            type="email" required placeholder='Your email id' 
                            className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
                        </div>
                        <div className='flex flex-col'>
                            <label>Password</label>
                            <input onChange={e => setPassword(e.target.value)} value={password}
                            type="password" required placeholder='Your password' 
                            className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
                        </div>

                        <button type='submit' className='w-full py-3 font-medium bg-primary
                        text-white rounded cursor-pointer hover:bg-primary/90'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;