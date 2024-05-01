"use client";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { CiVideoOn } from "react-icons/ci";
import { CgPlayButtonR } from "react-icons/cg";
import { CiPlay1 } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import razorpayImage from "../../../assets/images/hero-background.svg";

import Link from "next/link";
import { Loader } from "@/app/components/partials/loader";
import { Server, UserContext } from "@/app/layout";
import { toast } from "react-toastify";
import upiqr from "upiqr";
import Modal from "@/app/components/partials/modal";

const CourseDetails = ({ params }) => {
  const { UserData } = useContext(UserContext);
  const User = UserData?._doc;
  const [Course, setCourse] = useState();
  const [UPI, setUPI] = useState(null);
  const [UpiModal, setUpiModal] = useState(false);
  const [UTR, setUTR] = useState("");
  useEffect(() => {
    try {
      axios
        .post(`${Server}/get-course/by_id`, {
          course_id: params?.course_details,
        })
        .then((response) => {
          setCourse(response?.data?.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const BuyCourse = async () => {
    if (!User) {
      toast.error("Please login to purchase course");
      return;
    }

    upiqr({
      payeeVPA: "kabir4544@ybl",
      payeeName: "Ankit Pawar",
      amount: Course?.price,
    })
      .then((upi) => {
        setUPI(upi);
      })
      .catch((err) => {
        console.log(err);
      });

    setUpiModal(!UpiModal);
  };

  const SubmitUTR = () => {
    if (!UTR) {
      toast.error("Please enter valid UTR number");
      return;
    }
    try {
      axios
        .post(`${Server}/payment/create-order`, {
          order: {
            course_id: Course?.course_id,
            amount: Course?.price,
            title: Course?.title,
          },
          user: {
            user_id: User?.userId,
            name: User?.username,
            email: User?.email,
            contact: User?.phone,
          },
          utr: UTR,
        })
        .then((response) => {
          toast.success("Your course is arriving soon");
          setUpiModal(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal visiblity={UpiModal} onClose={() => setUpiModal(!UpiModal)}>
        <div className="px-3 flex text-slate-950 justify-center">
          <Image src="/upi.png" alt="" width={300} height={100} />
        </div>
        <div className="overflow-hidden rounded-2xl bg-white flex flex-col items-center w-fit">
          <Image
            src={UPI?.qr}
            alt="QR Code"
            width={400}
            height={400}
            className="w-80 bg-transparent"
          />
          <p className="text-wrap text-red-500 text-xs max-w-80 pb-4">
            Please complete the payment and wait for sometime for your purchase
            to process
          </p>
          <div className="p-2 w-full text-center bg-amber-500 rounded-lg">
            <a href={UPI?.intent} className="w-full">
              Pay with UPI
            </a>
          </div>
          <div className="flex flex-col w-full py-2">
            <input
              type="text"
              name="utr"
              value={UTR}
              onChange={(e) => setUTR(e.target.value)}
              placeholder="Enter the UTR"
              className="w-full border-2 border-slate-300 focus:border-violet-500 outline-none my-2 p-2 rounded-xl text-slate-950"
            />
            <button
              className="p-2 w-full text-center bg-violet-500 rounded-lg"
              onClick={SubmitUTR}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
      {Course ? (
        <div className="pt-32 bg-slate-800">
          <div className="bg-gray-900 text-slate-100 p-4 pt-5 md:py-12">
            <div className="container mx-auto lg:max-w-[1100px] relative">
              <div className="overflow-hidden rounded-lg w-fit lg:hidden">
                <Image
                  src={Course?.thumbnail_url}
                  height={450}
                  width={800}
                  alt={"Thumbnail Image"}
                />
              </div>
              <div className="flex flex-col mt-2 p-1 font-semibold backdrop-blur-sm lg:max-w-2xl">
                <p className="text-xl font-semibold md:text-4xl sm:my-4 my-2">
                  {Course?.title}
                </p>
                <p className="text-sm text-amber-500">
                  Accessible for {Course?.duration}s
                </p>
                <div className="flex items-center my-2">
                  <p className="text-amber-500 mr-2">5.0</p>
                  <FaStar className="text-yellow-500 m-0.5" />
                  <FaStar className="text-yellow-500 m-0.5" />
                  <FaStar className="text-yellow-500 m-0.5" />
                  <FaStar className="text-yellow-500 m-0.5" />
                  <FaStar className="text-yellow-500 m-0.5" />
                </div>
                <span className="flex items-center">
                  <p className="tsxt-sm">Instructor : &nbsp; </p>{" "}
                  {Course?.instructor}
                </span>
                <p className="text-2xl font-semibold my-1 text-amber-500 lg:hidden">
                  ₹&nbsp;{Course?.price}.00
                </p>
              </div>
              <button
                onClick={BuyCourse}
                className="bg-amber-500 rounded-lg w-full p-2 font-semibold text-slate-950 lg:hidden"
              >
                Buy Now
              </button>
              <div className="py-5 text-slate-200 lg:hidden">
                <p className="text-xs text-slate-300">What you will get :</p>
                <div className="flex items-center font-light my-0.5 ml-1">
                  <CiVideoOn />
                  <p className="px-1 text-sm">
                    {Course?.duration}s of video course
                  </p>
                </div>
                <div className="flex items-center font-light my-0.5 ml-1">
                  <LiaCertificateSolid />
                  <p className="px-1 text-sm">Certificate of completion</p>
                </div>
              </div>

              {/* absolute div */}
              <div className="overflow-hidden rounded-xl absolute right-0 max-w-96 top-0 bg-slate-100 text-slate-950 lg:block hidden">
                <Image
                  src={Course?.thumbnail_url}
                  height={450}
                  width={800}
                  alt={"Thumbnail Image"}
                />
                <div className="p-4">
                  <p className="text-3xl font-semibold m-2 ">
                    ₹&nbsp;{Course?.price}.00
                  </p>
                  <button
                    onClick={BuyCourse}
                    className="bg-amber-500 rounded-lg w-full p-2 font-semibold text-slate-950 my-2 text-xl"
                  >
                    Buy Now
                  </button>
                  <div className="p-3">
                    <p className="text-sm font-medium">What you will get :</p>
                    <div className="flex items-center my-2 ml-1 font-medium">
                      <CiVideoOn className="font-bold text-2xl" />
                      <p className="px-1">
                        {Course?.duration}s of video course
                      </p>
                    </div>
                    <div className="flex items-center my-2 ml-1 font-medium">
                      <LiaCertificateSolid className="font-bold text-2xl" />
                      <p className="px-1">Certificate of completion</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-300 flex items-center justify-center">
                    <div className="p-6 py-2">
                      <p className="text-sm">Powered by</p>
                      <Image
                        src={razorpayImage}
                        alt="Razorpay"
                        height={15}
                        width={150}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="items-start container mx-auto lg:max-w-[1100px]">
              <div className="lg:max-w-2xl p-4 py-10">
                <p className="text-slate-950 text-xl font-medium md:font-bold md:text-3xl">
                  Description
                </p>
                <p className="text-slate-950 my-4">{Course?.description}</p>
              </div>
              <div>
                <div className="lg:max-w-2xl p-4">
                  <p className="text-slate-950 text-xl font-semibold md:font-bold md:text-3xl">
                    Course Structure
                  </p>
                  <div className="text-slate-950 flex items-center">
                    <p className="text-sm">
                      {Course?.lessons?.length}&nbsp;
                      {Course?.lessons?.length === 1 ? "Chapter" : "Chapters"}
                      &nbsp;
                    </p>
                    <p className="font-bold">•</p> &nbsp;
                    <p className="text-sm">
                      {Course?.duration}s of on demand video Lectures
                    </p>
                  </div>
                  <div className="text-slate-950 border border-slate-200 my-3">
                    {Course?.lessons?.map((lesson, index) => {
                      return <Accordion key={index} lesson={lesson} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};
const Accordion = ({ lesson }) => {
  const [Toggle, setToggle] = useState(false);
  return (
    <div className="cursor-default">
      <div
        className="p-4 flex justify-between bg-slate-100"
        role="button"
        onClick={() => {
          setToggle(!Toggle);
        }}
      >
        <p className="font-bold">{lesson.title}</p>
        <div className="font-medium flex">
          <p className="font-bold">•</p>
          &nbsp;{lesson.content.length}&nbsp;
          {lesson.content.length === 1 ? "Lesson" : "Lessons"}
          <div className="flex items-center ml-3 text-lg duration-500 transition-all">
            {Toggle ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        </div>
      </div>
      {Toggle && (
        <div className="p-1 duration-300">
          {lesson.content.map((data, index) => {
            return (
              <div
                key={index}
                className="p-3 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <CgPlayButtonR />
                  <p className="mx-2 font-medium">{data.name}</p>
                </div>
                <div
                  // href={`?video=${data.url}`}
                  className="mx-2 cursor-pointer"
                >
                  <CiPlay1 />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default CourseDetails;
