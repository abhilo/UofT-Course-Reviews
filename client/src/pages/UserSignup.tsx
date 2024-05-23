import React, { useContext } from "react";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  // if (AuthContext === null) {
  //   return null;
  // }
  // {
  //   const { createUser } = UserAuth;
  //   const navigate = useNavigate();

  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();

  //     try {
  //       await createUser(email, password);
  //       navigate("/");
  //     } catch (e: any) {
  //       console.log(e.message);
  //     }
  //   };
  // }

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 supage">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Emelia Erickson"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)} // allows us to obtain the value within the input and update the state
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="blablabla@gmail.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                href="/userlogin"
              >
                Sign in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserSignup;
