"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import localStorage from "localStorage";
export const UserContext = createContext();

const montserrat = Montserrat({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export const Server = "http://192.168.1.39:9000";

const RootLayout = ({ children }) => {
  const [UserData, setUserData] = useState();
  const [Profile, setProfile] = useState();

  const router = useRouter();

  useEffect(() => {
    setUserData(jwt.decode(localStorage.getItem("accesstoken")));
    setProfile(
      `data: image/png;base64,${localStorage.getItem("profileImage")}`
    );
  }, []);

  const Logout = () => {
    localStorage.clear("accesstoken");
    localStorage.removeItem("profileImage");
    setUserData(null);
    setProfile(null);
    router.replace("/");
  };
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          bodyClassName="text-sm w-fit"
        />
        <UserContext.Provider
          value={{ UserData, Profile, setUserData, setProfile, Logout }}
        >
          {children}
        </UserContext.Provider>
      </body>
    </html>
  );
};
export default RootLayout;
