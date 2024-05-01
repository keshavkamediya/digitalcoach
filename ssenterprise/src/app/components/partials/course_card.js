import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { GoDotFill } from "react-icons/go";

const CourseCard = ({ course, button = true, coursePage }) => {
  const router = useRouter();
  const GoToLearning = () => {
    router.push(`/account/my-learning/${course.course_id}`);
  };
  return (
    <div
      className="p-4 w-11/12 max-w-screen sm:w-auto sm:max-w-[400px] flex-shrink-0 shadow-md bg-slate-800 rounded-xl m-2"
      role="button"
      onClick={() => (!button ? GoToLearning() : null)}
    >
      <div className="aspect-video relative rounded-md overflow-hidden w-fit h-fit">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            title={course?.type}
            className="whitespace-nowrap flex items-center cursor-pointer capitalize m-2 absolute top-0 right-0 bg-white w-fit pr-2 rounded-md text-slate-950 font-medium text-sm"
          >
            <GoDotFill className="text-amber-500 animate-pulse m-1" />
            {course?.type} Level
          </div>
          <div
            title={`Access for ${course?.duration} months`}
            className="whitespace-nowrap cursor-pointer capitalize m-2 absolute bottom-0 right-0 bg-yellow-500 w-fit px-2 rounded-md text-slate-950 font-medium text-sm"
          >
            Access for {course?.duration}
          </div>
        </div>
        <Image
          src={course?.thumbnail_url}
          height={450}
          width={800}
          alt={course?.title}
        />
      </div>
      <div className="px-2">
        <p className="capitalize text-amber-500 text-xs mt-2">
          {course?.type} Course
        </p>
        <p className="my-1 text-xl font-medium">{course?.name}</p>
        <p className="text-xs text-slate-300 my-2">{course?.description}</p>
      </div>
      <div
        className={`flex items-center p-2 ${coursePage ? "text-white" : null}`}
      >
        <div className="rounded-full overflow-hidden aspect-square ">
          <Image
            src={"/front-image.jpg"}
            width={40}
            height={40}
            quality={20}
            alt={course?.instructor}
          />
        </div>
        <div className="font-medium mx-3 items-center">
          <p>{course?.instructor}</p>
          <p className="text-xs text-slate-300">@DigitalCoach4u</p>
        </div>
      </div>
      {button && (
        <Link href={`courses/${course?.course_id}`}>
          <div
            className={` text-center ring-2 ring-amber-500 p-2 rounded-xl font-medium my-3 ${
              coursePage ? "bg-amber-500" : ""
            }`}
          >
            Enroll Now
          </div>
        </Link>
      )}
    </div>
  );
};

export default CourseCard;
