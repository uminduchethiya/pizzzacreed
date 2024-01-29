import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useState } from "react";
import loginImage from "../assets/Img/loginimg.png";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);


    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    };

    return (

        <div className="">
            <div className="flex flex-col md:flex-row w-full h-screen">
                <div className="md:w-1/2 h-screen  bg-opacity-50  rounded-lg  md:bg-white md:rounded-none z-10">
                    <img
                        src={loginImage}
                        alt="image"
                        className="w-full h-full "
                    />
                </div>
                <div className="md:w-1/2">
                    <div className="md:text-start mx-10 mt-10 text-center md:mt-20">
                        <h1 className="text-primaryColor font-bold md:text-6xl text-3xl">
                            Welcome <span className="text-black ">Back</span>
                        </h1>
                        <h1 className="text-black font-bold text-2xl mt-5">
                            Sign in with your email and password{" "}
                        </h1>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        action="#"
                        className="md:bg-transparent md:px-0 md:py-0 bg-orange-50 bg-opacity-75 px-10 py-10 rounded-xl"
                    >
                        {message && (
                            <div className="alert">
                                <p>{message}</p>
                            </div>
                        )}

                        <div className="flex flex-col space-y-1 md:w-[650px] w-[300px] mt-6 md:mx-10 ">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Email address
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex flex-col space-y-1 md:w-[650px] w-[300px] mt-6 md:mx-10 ">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-gray-500"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <input
                                ref={passwordRef}
                                type="password"
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>

                        <div className=" flex flex-col space-y-1 md:w-[600px] w-[250px] mt-6 md:mx-16 mx-5  ">
                            <button
                                type="submit"
                                className="justify-center px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-primaryColor rounded-lg focus:outline-none focus:ring-blue-200 focus:ring-4"
                            >
                                Log in
                            </button>
                        </div>
                        <div className="flex flex-col mt-20 space-y-5">
                            <span className="flex items-center justify-center space-x-2">
                                <span className="h-px bg-gray-400 w-14"></span>
                                <p className="message">
                                    Not registered?{" "}
                                    <Link to="/signup">Create an account</Link>
                                </p>
                                <span className="h-px bg-gray-400 w-14"></span>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
