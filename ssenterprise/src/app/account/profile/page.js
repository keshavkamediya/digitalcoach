"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Server, UserContext } from "@/app/layout";
import CourseCard from "@/app/components/partials/course_card";
import axios from "axios";
const Profile = () => {
  const { UserData, Profile } = useContext(UserContext);
  const User = UserData?._doc;
  const [Courses, setCourses] = useState();
  const GetUserCourse = async () => {
    try {
      const UserCourses = await axios.post(`${Server}/get-course/by_user`, {
        userId: User.userId,
      });
      return UserCourses.data.courses;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserCourse().then((data) => {
      setCourses(data);
    });
    return () => {};
  }, []);

  return (
    <div className="mx-auto container max-w-screen-xl">
      <div className="flex flex-col justify-center">
        <div className="p-4 flex flex-col sm:flex-row w-full my-4">
          {/* Player */}
          <div className="sm:w-1/2  w-full h-fit p-1">
            <div className=" bg-zinc-800 p-4 rounded-xl">
              <div className="flex items-center">
                {Profile ? (
                  <div className="w-fit rounded-full border-[3px] border-red-500 p-1">
                    <img src={Profile} width={80} height={80} alt="Avatar" />
                  </div>
                ) : null}
                <div className="mx-4">
                  <div className="text-xl">{User?.username}</div>
                  <div className="text-slate-400 text-xs">
                    User ID : {User?.userId}
                  </div>
                  <div className="text-sm">Email : {User?.email}</div>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  href="/account/profile"
                  className=" bg-slate-800 p-2 rounded-sm text-sm text-blue-500 cursor-pointer"
                >
                  My Learning »
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="p-3">My Learning</p>
          <div className="bg-slate-900 min-h-52 m-3 p-3 rounded-xl overflow-hidden">
            {Courses ? (
              <div className="items-center justify-start md:justify-center w-fit overflow-x-scroll md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-auto flex gap-2">
                {Courses?.map((course, index) => {
                  return (
                    <CourseCard key={index} course={course} button={false} />
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-slate-400 text-xl">
                Please purchase Course
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
