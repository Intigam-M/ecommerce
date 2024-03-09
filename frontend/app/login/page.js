"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth";
import APIClient from "@/services/api-client";

const apiClient = new APIClient('/auth/login/');

function LoginPage() {
  const [userInfo, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await apiClient.create({ user_info:userInfo, password });

    if (user) {
      router.replace("/");
      dispatch(setUser(user));
    }
  };

  return (
    <form className="w-full max-w-sm mx-auto"    onSubmit={handleSubmit}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
            User Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            value={userInfo}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password"
            type="password"
            value={password}
            required
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <input
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
