"use client";
import { Loader } from "@/app/components/partials/loader";
import { Server } from "@/app/layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Blog = () => {
  const [NewsData, setNewsData] = useState();
  useEffect(() => {
    axios
      .get(`${Server}/news`)
      .then((response) => {
        setNewsData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-3 items-center pt-40 container mx-auto">
      <div className="text-xl p-3 m-5 font-semibold">Latest Blogs</div>
      {NewsData ? (
        <div className="sm:columns-2 md:columns-3 lg:columns-4">
          {NewsData?.articles?.map((article, index) => {
            if (!article) return;
            return (
              <BlogCard
                UrlToPost={article.url}
                title={article.title}
                description={article.description}
                author={article.author}
                publishedAt={article.publishedAt}
                key={index}
                ImageUrl={article.urlToImage}
              />
            );
          })}
        </div>
      ) : (
        <div className="items-center flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};
const BlogCard = ({
  title,
  description,
  author,
  publishedAt,
  content,
  ImageUrl,
  source,
  UrlToPost,
}) => {
  return (
    <div className="flex flex-col my-3 break-inside-avoid shadow">
      {ImageUrl ? (
        <Image
          width={800}
          height={450}
          src={ImageUrl}
          alt="Failed to load Image"
          className="w-full aspect-video rounded-t-lg"
        />
      ) : (
        <div className="rounded-t-lg h-3 bg-zinc-900"></div>
      )}
      <div className="bg-zinc-900 p-3 rounded-b-lg flex flex-col">
        <p className="line-clamp-2 text-slate-100 text-lg font-bold">{title}</p>
        <p className="text-slate-300 my-2 text-sm">{publishedAt}</p>
        <p className="line-clamp-3 text-slate-100 text-sm font-light">
          {description}
        </p>
        <Link
          href={UrlToPost}
          className="self-end justify-self-end px-2 p-1.5 text-sm bg-amber-500 text-slate-950 font-semibold rounded-lg mt-2"
          target="_blank"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
export default Blog;
