"use client";
import CourseCard from "@/app/components/partials/course_card";
import { Server } from "@/app/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Courses = () => {
  const [Courses, setCourses] = useState();
  useEffect(() => {
    try {
      axios.get(`${Server}/get-course`).then((response) => {
        setCourses(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="">
      <div className="pt-40 h-screen items-center flex bg-[url('/background.webp')] bg-cover">
        <div className="px-8  mx-auto backdrop-blur-sm p-4 py-10">
          <div className="flex items-center p-1 bg-yellow-500 w-fit text-slate-950 font-semibold px-3 rounded-full">
            <p className="mr-16 sm:mr-28">BEST CRYPTO COURSES</p>
            <p>→</p>
          </div>
          <p className="text-5xl font-bold my-5 ">
            Join our Course and Start earning from now.
          </p>
          <p className="sm:w-3/4 text-slate-200">
            Over 40,000+ traders trust DigitalCoach4u&apos;s live forex signals.
            Our accurate forex signals are supplied by professional traders -
            who have over 15+ years experience each in the market, gaining our
            subscribers 1000&apos;s of pips every month in profit. Buy our daily
            forex signals today, or test our free forex signals on Telegram!
          </p>
          <button className="bg-yellow-500 text-slate-900 font-bold p-3 m-4 rounded-xl ">
            JOIN VIP CRYPTO COURSE
          </button>
        </div>
      </div>

      <div className="container mx-auto py-20 flex flex-col sm:flex-row flex-wrap items-center justify-center text-slate-950 ">
        {Courses?.map((course, index) => {
          return <CourseCard key={index} coursePage={true} course={course} />;
        })}
      </div>

      <div className="flex flex-col items-center text-center mx-auto py-20 text-white">
        <p className="text-slate-100 font-bold text-3xl mx-auto">
          WHAT&apos;S INCLUDED IN OUR AWARD WINNING CRYPTO COURSE
        </p>
        <div className="border-2 border-blue-500 w-20 my-2"></div>
        <p className="text-slate-200 w-1/2">
          If you are new to the crypto market and you would like to get a taste
          of what our crypto courses are like - join our basic Crypto Telegram
          channel below!
        </p>
        <div></div>
        <button className="font-semibold text-xl bg-amber-500 p-5 m-5 rounded-3xl">
          JOIN OUR FREE TELEGRAM CHANNEL
        </button>
      </div>
    </div>
  );
};

export default Courses;
