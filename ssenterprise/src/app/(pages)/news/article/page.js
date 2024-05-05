"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Article = () => {
  const searchParams = useSearchParams();
  const Source = searchParams.get("source");
  const Author = searchParams.get("author");
  const Title = searchParams.get("title");
  const Content = searchParams.get("content");
  const ImageUrl = searchParams.get("urlToImage");
  const Published = searchParams.get("publishedAt");
  const URLtoPost = searchParams.get("url");

  return (
    <div className="mx-auto container p-3 mt-10 flex flex-col items-center py-48">
      <p className="self-end text-slate-300">{Published}</p>
      <div className="flex items-center text-center justify-center w-full text-3xl font-bold my-5">
        {Title}
      </div>
      <div className=" flex rounded-2xl overflow-hidden sm:w-1/2 self-center m-4">
        <Image src={ImageUrl} width={1600} height={900} alt="" />
      </div>
      <div className="flex flex-col max-w-screen-sm">
        <p className="py-3 text-slate-300">Author : {Author}</p>
        {Content}
        <Link
          href={URLtoPost}
          className="text-blue-500 text-sm justify-self-end self-end"
        >
          Read more
        </Link>
      </div>
      {/* <p className="self-start text-slate-300 p-4">Source : {Source}</p> */}
    </div>
  );
};

export default Article;
