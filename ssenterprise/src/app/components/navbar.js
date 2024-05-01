"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { UserContext } from "../layout";
import Logo from "./partials/logo";
import Image from "next/image";

export const Navbar = () => {
  const { UserData, Profile } = useContext(UserContext);
  const User = UserData?._doc;

  const [IsOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between p-5 bg-slate-900/20 fixed backdrop-blur-md w-full top-0 z-50">
      <div
        className="justify-self-start cursor-pointer font-semibold text-xl flex items-center"
        title="ForexEagle4U"
      >
        <button
          className="mr-3 text-3xl md:hidden bg-slate-900/20 p-2 rounded-md"
          onClick={() => setIsOpen(!IsOpen)}
        >
          <IoMenu />
        </button>
        <Logo />
      </div>
      <div
        className={`z-50 justify-self-stretch md:static fixed top-0 left-0 p-4 md:p-0 bg-slate-950 md:bg-transparent h-screen w-screen md:h-auto md:w-auto ${
          IsOpen ? "" : "hidden"
        } md:block`}
      >
        <div className="p-5 md:hidden">
          <button
            className="text-3xl text-red-600 border-bc border-zinc-800 w-full flex justify-end p-2"
            title="Close menu"
            onClick={() => setIsOpen(!IsOpen)}
          >
            <IoClose />
          </button>
          <div
            className="cursor-pointer font-semibold text-xl text-center my-5"
            title="ForexEagle4U"
          >
            DigitalCoach4u
          </div>
        </div>
        <ul className="flex flex-col md:flex-row mt-10 sm:mt-0">
          <button
            onClick={() => {
              router.push("/");
              setIsOpen(!IsOpen);
            }}
            className={`mx-4 p-2 hover:text-red-500 cursor-pointer bg-slate-900 sm:bg-transparent m-1 sm:m-0 rounded-xl px-4 ${
              pathname == "/" ? "text-red-500" : ""
            }`}
            title="Home"
          >
            Home
          </button>
          <button
            onClick={() => {
              router.push("/blog");
              setIsOpen(!IsOpen);
            }}
            className={`mx-4 p-2 hover:text-red-500 cursor-pointer bg-slate-900 sm:bg-transparent m-1 sm:m-0 rounded-xl px-4 ${
              pathname == "/blog" ? "text-red-500" : ""
            }`}
            title="Blog"
          >
            Blog
          </button>
          <button
            onClick={() => {
              router.push("/news");
              setIsOpen(!IsOpen);
            }}
            className={`mx-4 p-2 hover:text-red-500 cursor-pointer bg-slate-900 sm:bg-transparent m-1 sm:m-0 rounded-xl px-4 ${
              pathname == "/news" ? "text-red-500" : ""
            }`}
            title="News"
          >
            News
          </button>
          <button
            onClick={() => {
              router.push("/courses");
              setIsOpen(!IsOpen);
            }}
            className={`mx-4 p-2 hover:text-red-500 cursor-pointer bg-slate-900 sm:bg-transparent m-1 sm:m-0 rounded-xl px-4 ${
              pathname == "/courses" ? "text-red-500" : ""
            }`}
            title="Courses"
          >
            Courses
          </button>
          <div className="mx-4 p-2 m-3 md:m-0 whitespace-nowrap flex items-center text-center text-slate-900 md:text-inherit font-medium">
            {!UserData ? (
              <Link href={"/login"} className="self-center">
                Sign Up / Sign In
              </Link>
            ) : (
              <Link href={"/account/profile"} className="w-full">
                <div className="flex justify-start bg-amber-500 md:bg-transparent items-center w-full rounded-full p-2 shadow">
                  <div className="w-16 h-16 rounded-full border-2 border-purple-500 p-1 ">
                    <Image src={Profile} width={100} height={100} />
                  </div>
                  <div className=" text-start px-3">
                    <p className="font-semibold">{User?.username}</p>
                    <p className="text-sm">User ID : {User?.userId}</p>
                  </div>
                  <div></div>
                </div>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};
