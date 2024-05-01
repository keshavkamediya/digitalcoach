"use client";
import VideoPlayer from "@/app/components/partials/video_player";
import { Server, UserContext } from "@/app/layout";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import { CiPlay1, CiVolumeHigh } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Course = ({ params }) => {
  const [Course, setCourse] = useState();
  const [videoURI, setvideoURI] = useState();
  const { UserData } = useContext(UserContext);
  const User = UserData?._doc;

  const GetVideoURI = async (video) => {
    const videoURL = await axios.post(`${Server}/get-video-uri`, {
      video,
      userId: User.userId,
      course_id: Course.course_id,
    });
    setvideoURI(videoURL.data.url);
  };

  useEffect(() => {
    try {
      axios
        .post(`${Server}/get-course/by_id`, {
          course_id: params?.course_id,
        })
        .then((response) => {
          setCourse(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="p-3 bg-slate-200 m-2 my-6 rounded-lg">
      <div className="flex flex-col-reverse lg:flex-row h-fit">
        <div className="lg:w-1/4">
          <div className="">
            <div className="lg:max-w-2xl">
              <p className="text-slate-950 text-xl font-semibold">
                Course Structure
              </p>
              <div className="text-slate-950 border border-slate-400 my-3 shadow-lg">
                {Course?.lessons?.map((lesson, index) => {
                  return (
                    <Accordion
                      key={index}
                      lesson={lesson}
                      GetVideoURI={GetVideoURI}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-3/4 p-2">
          <VideoPlayer video={videoURI} />
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ lesson, GetVideoURI }) => {
  const [Toggle, setToggle] = useState(false);
  return (
    <div className="cursor-default">
      <div
        className="p-4 flex items-center justify-between bg-slate-100"
        role="button"
        onClick={() => {
          setToggle(!Toggle);
        }}
      >
        <p className="font-bold text-sm">{lesson.title}</p>
        <div className="font-medium flex text-xs">
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
                  <p className="mx-2 font-medium text-sm">{data.name}</p>
                </div>
                <div
                  role="button"
                  onClick={() => GetVideoURI(data.url)}
                  className="mx-2 cursor-pointer hover:text-red-500 font-bold"
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

export default Course;
