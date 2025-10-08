import Header from "../admin/partial/Header";
import Footer from "../admin/partial/Footer";
import {useForm} from 'react-hook-form';
import axios from "axios";
import { useState } from "react";
import dd from "../../../Helpers/helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Register() {

  const {register, handleSubmit, formState: { errors }} = useForm();

  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    try{
      const result = await axios.post(`${api_url}/register`, data);
      if(result.status === 201){
        toast.success("Registration Completed Successfully!");
        navigate('/Confirmation');
      }
    }catch(err){
      if(err.response){
        toast.error(err.response.data.message);
        setErrorMessage(err.response.data.message);
      }else{
        toast.error("Registration failed. Please try again.");
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <Header />

      <div className="flex flex-1 items-center justify-center px-4 mt-40">
        <div className="w-full max-w-md bg-white/10  border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Welcome Back
          </h2>
          <p className="bg-gradient-to-r from-gray-800 via-gray-100 to-gray-800 text-transparent text-center mb-8">
            <span className="font-bold text-black">Please register to continue</span>
          </p>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email" autoComplete="on"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-3 focus:ring-indigo-200 transition"
                {...register('email',{'required': "Enter your email"})}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username" autoComplete="on"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-3 focus:ring-indigo-200 transition"
                {...register('username',{'required': "Enter your username"})}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password" autoComplete="on"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-3 focus:ring-indigo-200 transition"
                {...register('password',{'required':"Enter Your Password"})}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-3 focus:ring-indigo-200 transition"
                {...register('phone_number',{'required':"Enter Your Phone Number"})}
              />
              {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800 text-white font-bold shadow-lg hover:opacity-90 hover:scale-[1.02]"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
