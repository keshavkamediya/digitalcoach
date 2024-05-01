import { UserContext } from "@/app/layout";
import React, { useContext, useRef } from "react";

const VideoPlayer = ({ video }) => {
  const { UserData } = useContext(UserContext);
  const User = UserData?._doc;

  return (
    <div>
      <div
        className="rounded-lg overflow-hidden relative h-fit bg-slate-950 p-2"
        role="button"
      >
        <video
          autoPlay={true}
          src={video}
          className={`aspect-video w-full shadow-inner shadow-black bg-slate-100 rounded-md`}
          controls={true}
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        ></video>
        <div className="absolute top-0 right-0 text-sm p-2">
          <div className="h-full justify-end text-end p-2 stroke-black">
            <p className="text-sm shadow-black text-slate-500 font-semibold">
              User :&nbsp;{User?.username}
            </p>
            <p className="text-sm shadow-black text-slate-500 font-semibold">
              Phone :&nbsp;{User?.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
