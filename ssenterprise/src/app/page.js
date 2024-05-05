"use client";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { IoIosArrowForward } from "react-icons/io";

import Image from "next/image";
import CourseCard from "./components/partials/course_card";
import Newsletter from "./components/partials/newsletter";
import axios from "axios";
import { useEffect, useState } from "react";
import { Server } from "./layout";
import Link from "next/link";

export default function Home() {
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
    <>
      <Navbar />
      {/* TickerTape */}
      {/* Homepage */}
      <div className="h-fit">
        <div className="pt-32 relative">
          <div className="absolute h-[100vh] w-[50%] bg-yellow-500 left-0 top-0 -z-50 rounded-[50%] blur-[100px] sm:blur-[300px] animate-pulse opacity-30"></div>
          <div className="sm:items-center flex flex-col-reverse sm:flex-row  h-screen overflow-hidden sm:justify-between justify-end sm:-mt-16">
            <div className="p-6  sm:mt-0 items-center  backdrop-blur-md backdrop-opacity-50">
              <div className="max-w-screen-sm">
                <p className="font-semibold text-4xl md:text-3xl text-start">
                  Learn to trade with India&apos;s Best Crypto Coach.
                </p>
                <p className="text-wrap my-2 text-slate-300 text-sm md:text-base">
                  Led by industry professionals and blockchain enthusiasts, our
                  courses cover everything from the fundamentals of blockchain
                  technology to advanced trading strategies. Discover how
                  blockchain is revolutionizing industries, explore the
                  mechanics of different cryptocurrencies, and learn how to
                  safely store and manage your digital assets.
                </p>
              </div>
              <Link
                href={"/courses"}
                className="p-3 bg-amber-500 rounded-lg my-6 px-4 text-xl items-center font-semibold flex w-fit"
              >
                Enroll Now <IoIosArrowForward className="ml-3" />
              </Link>
            </div>
            <div className="pl-10">
              <div className="flex overflow-hidden rounded-tl-[500px] rounded-bl-[400px] justify-items-end max-h-[700px] max-w-[700px]">
                <Image
                  alt="Ankit Pawar"
                  src={"/front-image (2).jpg"}
                  width={800}
                  height={800}
                  className="max-h-screen"
                ></Image>
              </div>
            </div>
          </div>
        </div>
        <div className="flex overflow-x-scroll sm:overflow-auto sm:justify-evenly py-10">
          {Courses?.map((course, index) => {
            return <CourseCard key={index} course={course} />;
          })}
        </div>
        <div className="py-10 flex flex-col items-center justify-center bg-white text-slate-950 p-2">
          <p className="flex text-amber-500 font-semibold text-center">
            DON&apos;T HESITATE
          </p>
          <p className="flex sm:text-4xl text-3xl font-bold text-center  max-w-screen-lg">
            Wealth is not about having a lot of money, it&apos;s all about
            having a lot of options
          </p>
          <div className="flex items-center justify-center mt-10 p-2">
            <Link
              href={"/courses"}
              className="bg-amber-500 p-3 text-lg font-semibold rounded-2xl text-center"
            >
              Start With Our New Crypto Course Series Today
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center m-10">
            <div className="rounded-full overflow-hidden">
              <Image
                alt="Ankit Panwar"
                src={"/front-image.jpg"}
                width={150}
                height={150}
                priority
                className="max-h-screen"
              />
            </div>
            <div className="mx-4 text-center">
              <p className="font-bold text-lg">Ankit Panwar</p>
              <p className="font-medium">@digitalcoach_ankit</p>
            </div>
          </div>
        </div>
        <div className="pt-10 flex flex-col items-center justify-center bg-white text-slate-950 bg-gradient-to-b from-white via-slate-100 to-white ">
          <div className=" text-3xl flex flex-col font-bold items-center mb-5">
            <p>Premium Plans</p>
            <p className="text-base">Start earning today</p>
          </div>
          <div className="flex overflow-x-scroll mt-10 w-full lg:justify-center md:overflow-x-auto text-white">
            {Courses?.map((course, index) => {
              return <CourseCard key={index} course={course} />;
            })}
          </div>
        </div>
        <div className="py-10 flex flex-col w-full items-center">
          <p className="text-2xl font-bold ">Our Results</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8 w-full p-2">
            <div className="bg-gray-400/30 min-w-fit rounded-2xl py-6 text-center w-full">
              <p className="font-bold text-xl">Members</p>
              <p className="font-extrabold md:text-[32px] text-2xl text-amber-500">
                70K+
              </p>
            </div>
            <div className="bg-gray-400/30 min-w-fit rounded-2xl py-6 text-center w-full">
              <p className="font-bold text-xl">Course sent</p>
              <p className="font-extrabold md:text-[32px] text-2xl text-amber-500">
                3000+
              </p>
            </div>
            <div className="bg-gray-400/30 min-w-fit rounded-2xl py-6 text-center w-full">
              <p className="font-bold text-xl">Stay with us</p>
              <p className="font-extrabold md:text-[32px] text-2xl text-amber-500">
                85%+
              </p>
            </div>
            <div className="bg-gray-400/30 min-w-fit rounded-2xl py-6 text-center w-full">
              <p className="font-bold text-xl">Experience</p>
              <p className="font-extrabold md:text-[32px] text-2xl text-amber-500">
                10 Years +
              </p>
            </div>
          </div>
        </div>

        {/* <Newsletter /> */}
      </div>
      {/* Homepage */}
      <Footer />
    </>
  );
}
