"use client";
import { Loader } from "@/app/components/partials/loader";
import { Server } from "@/app/layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const News = () => {
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
    <div className="mx-auto container flex flex-col p-4 max-w-screen-xl pt-40">
      <div className="flex items-center justify-between m-3">
        <p className="text-xl">Trending News</p>
      </div>
      {NewsData ? (
        NewsData?.articles?.map((article, index) => {
          return (
            <Link
              href={{
                pathname: "/news/article",
                query: article,
              }}
              className="flex flex-row py-3"
              key={index}
            >
              <div className="rounded-lg  w-2/5 max-w-72 sm:max-h-36 aspect-video overflow-hidden">
                {article.urlToImage ? (
                  <Image
                    width={800}
                    height={450}
                    className="bg-cover "
                    src={article.urlToImage}
                    alt={article.title}
                  />
                ) : null}
              </div>
              <div className="ml-3 text-ellipsis w-3/5 text-start">
                <p className="text-slate-400 text-xs text-end">
                  {article.publishedAt}
                </p>
                <p className="font-bold line-clamp-1 w-full">{article.title}</p>
                <p className="sm:mt-3 text-xs line-clamp-2 sm:line-clamp-4">
                  {article.description}
                </p>
                <p className="text-slate-400 text-xs">
                  Author : {article.author}
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="items-center flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default News;
