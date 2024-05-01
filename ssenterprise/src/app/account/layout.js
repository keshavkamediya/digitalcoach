"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { UserContext } from "../layout";
import { IoIosLogOut } from "react-icons/io";
import localStorage from "localStorage";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [IsLoggedIn, setIsLoggedIn] = useState();
  const { Logout } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  if (!IsLoggedIn) {
    return (
      <section
        className="flex justify-center items-center max-w-screen-xl h-screen"
        lang="en"
      >
        <div className="flex flex-col justify-center items-center">
          <p className="text-3xl my-3">Oops,</p>
          <p className="text-2xl text-red-500">Access denied</p>
          <p className="text-2xl text-amber-500">Please Login first</p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="mt-6" lang="en">
        <div className="flex justify-between  px-4">
          <button
            onClick={() => router.back()}
            title="Go back"
            className="w-10 h-10 aspect-square bg-slate-800 rounded-full flex items-center justify-center"
          >
            <IoIosArrowBack className="aspect-square" />
          </button>
          <button
            onClick={Logout}
            title="Logout"
            className="bg-orange-600 rounded-lg p-2 text-slate-950 font-medium flex items-center"
          >
            <p>Logout</p>
            <IoIosLogOut className="ml-2 font-bold" />
          </button>
        </div>
        {children}
      </section>
    );
  }
}
