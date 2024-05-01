"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Server, UserContext } from "@/app/layout";
import jwt from "jsonwebtoken";
import Logo from "@/app/components/partials/logo";

const Login = () => {
  const router = useRouter();
  const [TogglePass, setTogglePass] = useState(true);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Remember, setRemember] = useState(false);

  const { setUserData, setProfile } = useContext(UserContext);

  const LoginUser = () => {
    if (Username && Password) {
      axios
        .post(`${Server}/auth/login`, {
          username: Username,
          password: Password,
          remember: Remember,
        })
        .then((response) => {
          let { status, message } = response.data;
          if (status === "success") {
            let { accesstoken, profile } = response.data;
            if (accesstoken) {
              try {
                localStorage.setItem("accesstoken", accesstoken);
                localStorage.setItem("profileImage", profile);
                setProfile(`data: image/png;base64,${profile}`);
                setUserData(jwt.decode(accesstoken));
                toast.success(message);
                setTimeout(() => {
                  router.replace("/");
                }, 1500);
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            toast.error(message);
          }
        })
        .catch((error) => console.log(error));
    } else {
      toast.warn("Fields cannot be empty.");
    }
  };

  const handleCheck = (e) => {
    setRemember(e.target.checked);
  };
  return (
    <div className="flex flex-col items-center justify-around h-screen mx-auto container p-5">
      <div className="flex flex-col items-baseline justify-center ">
        <Logo />
      </div>
      <div className="flex flex-col max-w-screen-sm sm:px-10 p-5 w-full">
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="username" className="mx-2 p-2 text-slate-400 text-sm">
            E-mail or Phone
          </label>
          <input
            type="text"
            id="username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-zinc-800 p-3 rounded-xl border-2 outline-none border-opacity-50 border-transparent focus:border-violet-500 "
          />
        </div>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="password" className="mx-2 p-2 text-slate-400 text-sm">
            Password
          </label>
          <span className="flex bg-zinc-800 rounded-xl">
            <input
              type={TogglePass ? "password" : "text"}
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className={`rounded-l-xl bg-zinc-800 p-3 border-2 outline-none border-opacity-50  border-transparent focus:border-violet-500 w-full ${
                TogglePass ? "tracking-[5px]" : "tracking-normal"
              }`}
              placeholder="********"
            />
            <button
              className="p-3 text-xl"
              onClick={() => setTogglePass(!TogglePass)}
            >
              {TogglePass ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </span>
        </div>
        <div className="flex items-center p-3">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={Remember}
            onChange={handleCheck}
          />
          <p className="mx-2 text-sm">Remember me</p>
        </div>
        <div className="flex flex-col w-full mt-8 items-center">
          <button
            className="bg-violet-600 p-2.5 rounded-xl w-full mx-6"
            placeholder="********"
            onClick={LoginUser}
          >
            Sign-In
          </button>
        </div>
        {/* <Link
          href={"/reset-password"}
          className="text-center text-xs text-blue-500 m-5"
        >
          Forgot password ?
        </Link> */}
      </div>
      <div>
        <p className="text-sm text-slate-500">
          Don&apos;t have an account{" "}
          <Link href={"/register"} className="text-blue-600">
            Sign Up
          </Link>
          .{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
