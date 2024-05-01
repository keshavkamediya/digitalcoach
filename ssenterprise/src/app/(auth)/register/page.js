"use client";
import Logo from "@/app/components/partials/logo";
import { Server } from "@/app/layout";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

const Register = () => {
  const router = useRouter();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [ConPass, setConPass] = useState("");
  const [AgreeT_C, setAgreeT_C] = useState(false);
  const [registerStep, setregisterStep] = useState(0);

  useEffect(() => {
    return () => {
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConPass("");
      setAgreeT_C(false);
      setregisterStep(0);
    };
  }, []);

  const handleChecked = (e) => {
    setAgreeT_C(e.target.checked);
  };

  const Register = () => {
    if (AgreeT_C) {
      if (Name && Email && Phone && Password && ConPass) {
        if (validator.isEmail(Email)) {
          if (validator.isMobilePhone(Phone)) {
            if (Password === ConPass) {
              if (Password.length >= 8) {
                axios
                  .post(`${Server}/auth/register`, {
                    username: Name,
                    email: Email,
                    phone: Phone,
                    password: Password,
                  })
                  .then((resp) => {
                    if (resp.data.status === "success") {
                      toast.success("User registered successfully");
                      setregisterStep(2);
                    } else {
                      toast.error(resp.data.message);
                    }
                  })
                  .catch((err) => {
                    toast.error("Failed to register user");
                    console.log(err);
                  });
              } else {
                toast.warn("Password must contain 8 characters");
              }
            } else {
              toast.warn("Password and Confirm password does not match");
            }
          } else {
            toast.warn("Invalid phone number");
          }
        } else {
          toast.warn("Invalid E-mail address");
        }
      } else {
        toast.warn("Fields cannot be empty");
      }
    } else {
      toast.warn(
        "Please read and agree to the terms & condition and privacy policy"
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-around h-screen mx-auto container p-5">
      <div className="flex flex-col items-baseline justify-center ">
        <Logo />
      </div>
      <div className="flex flex-col max-w-screen-sm sm:px-10 p-5 w-full">
        <div className="flex justify-center items-center">
          <div
            className={`text-3xl px-2 ${
              registerStep === 0 ? "text-red-500 text-[40px]" : ""
            }`}
          >
            •
          </div>
          <div
            className={`text-3xl px-2 ${
              registerStep === 1 ? "text-red-500 text-[40px]" : ""
            }`}
          >
            •
          </div>
          <div
            className={`text-3xl px-2 ${
              registerStep === 2 ? "text-red-500 text-[40px]" : ""
            }`}
          >
            •
          </div>
        </div>
        <RegistrationStep
          Name={Name}
          setName={setName}
          Email={Email}
          setEmail={setEmail}
          Phone={Phone}
          setPhone={setPhone}
          Password={Password}
          setPassword={setPassword}
          ConPass={ConPass}
          setConPass={setConPass}
          AgreeT_C={AgreeT_C}
          handleChecked={handleChecked}
          Register={Register}
          registerStep={registerStep}
          setregisterStep={setregisterStep}
        />
      </div>
      <div>
        <p className="text-sm text-slate-500">
          Don&apos;t have an account{" "}
          <Link href={"/login"} className="text-blue-600">
            Sign In
          </Link>
          .{" "}
        </p>
      </div>
    </div>
  );
};
const RegistrationStep = ({
  Name,
  setName,
  Email,
  setEmail,
  Phone,
  setPhone,
  Password,
  setPassword,
  ConPass,
  setConPass,
  AgreeT_C,
  handleChecked,
  Register,
  registerStep,
  setregisterStep,
}) => {
  const [UserOTP, setUserOTP] = useState();
  const [verificationCode, setVerificationCode] = useState("");
  useEffect(() => {
    return () => {
      setUserOTP(undefined);
      setVerificationCode("");
    };
  }, []);
  const SendOTP = () => {
    if (validator.isMobilePhone(Phone)) {
      toast.info("Sending OTP");
      axios
        .post(`${Server}/auth/register/otp`, {
          phone: Phone,
        })
        .then((resp) => {
          if (resp.data.status === "success") {
            toast.success(resp.data.message);
            setUserOTP(resp.data.verificationCode);
          } else {
            toast.warn(resp.data.message);
          }
        })
        .catch((err) => {
          toast.error("Something went wrong please try again later");
        });
    } else {
      toast.warn("Please enter valid phone number");
    }
  };

  const verifyOTP = () => {
    if (verificationCode) {
      if (verificationCode === UserOTP) {
        setregisterStep(1);
      } else {
        toast.warn("Incorrect OTP entered");
      }
    } else {
      toast.warn("Please enter OTP");
    }
  };

  switch (registerStep) {
    case 0:
      return (
        <div>
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="phone" className="mx-2 p-1 text-slate-400 text-sm">
              Phone
            </label>
            <input
              tabIndex="1"
              type="tel"
              id="phone"
              className="bg-zinc-800 p-4 rounded-xl border-2 outline-none border-opacity-50 border-transparent focus:border-violet-500 my-1 "
              onChange={(e) => setPhone(e.target.value.toUpperCase())}
              value={Phone}
              disabled={UserOTP}
              maxLength={10}
            />
            {UserOTP ? (
              <div>
                <label
                  htmlFor="phone"
                  className="mx-2 mt-5 mb-1 p-1 text-slate-400 text-sm"
                >
                  Please enter OTP
                </label>

                <div className="flex mb-5 sm:flex-row flex-col">
                  <input
                    tabIndex="2"
                    type="number"
                    id="OTP"
                    className="sm:mr-1 bg-zinc-800 p-4 rounded-xl border-2 outline-none border-opacity-50 border-transparent focus:border-violet-500 text-center tracking-[10px] font-bold sm:tracking-[15px] sm:w-3/5"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    value={verificationCode}
                    placeholder="******"
                  />
                  <button
                    tabIndex="3"
                    className="sm:ml-1 mt-3 sm:mt-0 border-violet-600 border-[3px]  p-2.5 rounded-xl w-full sm:w-2/5"
                    onClick={verifyOTP}
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <button
            tabIndex="3"
            className="bg-violet-600 p-2.5 rounded-xl w-full my-4"
            onClick={SendOTP}
          >
            Send OTP
          </button>
        </div>
      );
    case 1:
      return (
        <div>
          <div className="flex flex-col w-full mt-2">
            <div>
              <div className="flex flex-col w-full mt-4">
                <label
                  htmlFor="name"
                  className="mx-2 p-1 text-slate-400 text-sm"
                >
                  Name
                </label>
                <input
                  tabIndex="1"
                  type="text"
                  id="name"
                  className="bg-zinc-800 p-2 rounded-xl border-2 outline-none border-opacity-50 border-transparent focus:border-violet-500 "
                  onChange={(e) => setName(e.target.value)}
                  value={Name}
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <label
                  htmlFor="E-mail"
                  className="mx-2 p-1 text-slate-400 text-sm"
                >
                  E-mail
                </label>
                <input
                  tabIndex="2"
                  type="email"
                  id="E-mail"
                  className="bg-zinc-800 p-2 rounded-xl border-2 outline-none border-opacity-50 border-transparent focus:border-violet-500 "
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                />
              </div>
              <div className="flex sm:flex-row flex-col">
                <div className="flex flex-col w-full mt-2 mr-1">
                  <label
                    htmlFor="password"
                    className="mx-2 p-1 text-slate-400 text-sm"
                  >
                    Password
                  </label>
                  <input
                    tabIndex="4"
                    type="password"
                    id="password"
                    className="bg-zinc-800 p-2 rounded-xl border-2 outline-none border-opacity-50 border-transparent focus:border-violet-500 "
                    onChange={(e) => setPassword(e.target.value)}
                    value={Password}
                  />
                </div>
                <div className="flex flex-col w-full mt-2 ml-1">
                  <label
                    htmlFor="confirm-pass"
                    className="mx-2 p-1 text-slate-400 text-sm"
                  >
                    Confirm password
                  </label>
                  <input
                    tabIndex="5"
                    type="text"
                    id="confirm-pass"
                    className="bg-zinc-800 p-2 rounded-xl border-2 outline-none border-opacity-50 border-transparent focus:border-violet-500 "
                    onChange={(e) => setConPass(e.target.value)}
                    value={ConPass}
                  />
                </div>
              </div>
              <div className="flex items-center p-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={AgreeT_C}
                  onChange={handleChecked}
                />
                <p className="mx-2 text-sm">
                  I agree to the platform&apos;s{" "}
                  <Link
                    href="/terms-conditions"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col w-full mt-8 items-center">
                <button
                  tabIndex="6"
                  className="bg-violet-600 p-2.5 rounded-xl w-full mx-6"
                  onClick={Register}
                >
                  Sign-Up
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm my-3">User has been registered successfully</p>
          <p className="font-bold text-xl my-3">Please Sign-In</p>
          <Link
            href={"/login"}
            className="text-white bg-blue-600 px-10 py-1 rounded-lg"
          >
            Sign In
          </Link>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-2xl my-2 ">Oops</p>
          <p className="my-2">Something went wrong</p>
          <Link
            href={"/"}
            className=" mt-4 text-white bg-yellow-600 px-10 py-1 rounded-lg"
          >
            Home
          </Link>
        </div>
      );
  }
};
export default Register;
