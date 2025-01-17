import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-600">{isLogin ? "Or login with" : "Or sign up with"}</span>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="text-red-600 hover:text-red-700 transition">
            <FaGoogle size={24} />
          </button>
          <button className="text-blue-700 hover:text-blue-800 transition">
            <FaFacebook size={24} />
          </button>
          <button className="text-gray-700 hover:text-gray-800 transition">
            <FaGithub size={24} />
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline ml-2 focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
