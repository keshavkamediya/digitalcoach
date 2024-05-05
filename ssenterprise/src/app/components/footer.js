import React from "react";
import { FaInstagram, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <>
      <div className="bg-slate-950 text-white sm:p-10 px-5 w-full py-10 ">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 px-2">
          <div className="flex items-center justify-start">
            <div className="rounded-full overflow-hidden">
              <Image
                alt="Ankit Panwar"
                src={"/front-image.jpg"}
                width={50}
                height={50}
                priority
                className="max-h-screen"
              />
            </div>
            <div className="mx-2">
              <p className="text-sm">Ankit Panwar</p>
              <p className="text-sm">@digitalcoach_ankit</p>
            </div>
          </div>{" "}
          <div className="flex items-center">
            <Link href="https://instagram.com/digitalcoach_ankit">
              <FaInstagram className="text-2xl mx-2 text-pink-400" />
            </Link>
            <Link href="https://youtube.com">
              <FaYoutube className="text-2xl mx-2 text-red-500" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row pt-10">
          <div className="sm:w-3/5 m-1 flex flex-col sm:flex-row justify-between">
            <div className="pb-4">
              <p className="font-medium text-lg text-slate-400">
                Important Links
              </p>
              <ul className="text-slate-200">
                <li>
                  <Link href={"/news"} className="my-2 cursor-pointer">
                    News
                  </Link>
                </li>
                {/* <li className="my-2 cursor-pointer">Crypto Signals</li> */}
                <li>
                  {/* <Link href={"/blog"} className="my-2 cursor-pointer">
                    Blog
                  </Link> */}
                </li>
                {/* <li className="my-2 cursor-pointer">Trading</li>
                <li className="my-2 cursor-pointer">Brokers</li> */}
              </ul>
            </div>
            <div className="pb-4">
              <p className="font-medium text-lg text-slate-400">Our Products</p>
              <ul className="text-slate-200">
                <li className="my-2 cursor-pointer">
                  <Link href={"/courses"}>Free Crypto Courses</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href={"#"}>VIP Telegram Subscription</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href={"/courses"}>Crypto Trading Course</Link>
                </li>
              </ul>
            </div>
            <div className="pb-4">
              <p className="font-medium text-lg text-slate-400">Information</p>
              <ul className="text-slate-200">
                <li className="my-2 cursor-pointer">
                  <Link href={"/about"}>About Us</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href={"/terms-conditions"}>Terms & Conditions</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href={"/contact"}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-2/5 m-1 flex justify-center items-center self-center">
            <div>
              <p className="text-xl font-semibold text-center text-amber-500">
                Contact Us
              </p>
              <div className="flex mt-2 items-center">
                <FaPhoneAlt className="text-xl m-2" />
                +91 88890 62910
              </div>
              <div className="flex mt-2 items-center">
                <CiMail className="text-2xl m-2" />
                suport@DigitalCoach4u.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 flex items-center justify-center text-sm text-slate-400 border-t border-slate-900 p-2">
        2024 All rignts reserved @DigitalCoach4u.com
      </div>
    </>
  );
};
