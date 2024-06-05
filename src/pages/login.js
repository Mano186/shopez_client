import React, { useContext, useState } from 'react';
import loginIcons from '../assest/sign.gif';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            fetchUserDetails()
            fetchUserAddToCart()
            navigate('/');
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }


    };

    console.log("data login", data);
    return (
        <div>
            <section id='login'>
                <div className='mx-auto container p-4'>
                    <div className=' bg-white p-2 py-5 w-full max-w-md mx-auto'>

                        <div className='w-20 h-20 mx-auto'>
                            <div>
                                <img src={loginIcons} alt='login icons' />
                            </div>
                        </div>

                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                            <div className='grid'>
                                <label>Email: </label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='email'
                                        placeholder='Enter Email'
                                        value={data.email}
                                        name='email'
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent' />
                                </div>
                            </div>

                            <div>
                                <label>Password: </label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder='Enter Password'
                                        value={data.password}
                                        name='password'
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent' />
                                    <div className='cursor-pointer text-lg' onClick={() => setShowPassword(prev => !prev)}>
                                        <span>
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </span>
                                    </div>

                                </div>
                                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-orange-400'>
                                    Forgot Password
                                </Link>
                            </div>

                            <button className='bg-orange-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                        </form>
                        <p className='my-5'>Don't have account ? <Link to={'/sign-up'} className='text-orange-400 hover:underline'>Sign Up</Link></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
