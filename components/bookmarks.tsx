"use client";
import { BsPin } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { LuArrowDownUp } from "react-icons/lu";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import BouncingLoader from "./BouncingLoader";

type AllBookMarkType = {
  id: number;
  title: string;
  description: string;
  logo: string;
  categories: string[];
  tags: string[];
  views: number;
  datePosted: string;
  pinned: boolean;
  link: string;
};

const Bookmark = ({
  searchBookmark,
  tags,
}: {
  searchBookmark: string;
  tags: string[];
}) => {
  const [allBookmarks, setAllBookmarks] = useState<AllBookMarkType[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBookmarks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/bookmark");
        setAllBookmarks(response.data.bookmarks);
      } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    getBookmarks();
  }, []);

  const newBookmark: AllBookMarkType[] = allBookmarks.filter((bookmark) => {
    const matchesSearch = bookmark.title
      .toLowerCase()
      .includes(searchBookmark.toLowerCase());

    const matchesTags =
      tags.length === 0 ||
      bookmark.categories.some((category) => tags.includes(category));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="px-7 py-6 w-full">
      {loading ? (
        <div className="flex justify-center items-center w-full h-[80vh] ">
          <BouncingLoader />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="text-green-900 text-xl font-semibold">
              All bookmarks
            </h1>
            <button className="flex gap-1 items-center bg-white py-2 px-4 rounded-md border">
              <span>
                <LuArrowDownUp />
              </span>
              <span>Sort by</span>
            </button>
          </div>

          <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5 mt-5 w-full">
            {newBookmark?.map((bookmark) => (
              <div className="bg-white py-3 rounded-md " key={bookmark.id}>
                <div className="bg-white py-3 px-5 ">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <div className="flex gap-3 items-center">
                      <div className="border border-gray-300 p-2 rounded-md">
                        <Image
                          width={50}
                          height={50}
                          src={bookmark?.logo}
                          alt={bookmark?.title}
                          unoptimized
                          className="w-8 h-8 rounded-md"
                        />
                      </div>
                      <div className="pb-2 space-y-0.5">
                        <h2 className="text-lg font-semibold text-black  ">
                          {" "}
                          {bookmark?.title}{" "}
                        </h2>
                        <Link
                          className="text-sm text-gray-500/80 "
                          href={bookmark?.link}
                        >
                          {" "}
                          {bookmark?.link.slice(8, bookmark?.link.length)}{" "}
                        </Link>
                      </div>
                    </div>

                    <div className="border border-gray-300 p-2 rounded-md">
                      <SlOptionsVertical className="text-gray-700" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mt-5">
                      {" "}
                      {bookmark?.description}{" "}
                    </p>
                  </div>

                  <div>
                    <div className="flex gap-2 mt-5">
                      {bookmark?.categories.map((category, index) => (
                        <div
                          key={index}
                          className="bg-green-900/10 text-gray-500 text-xs px-2.5 py-1.5 rounded-md"
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="text-gray-200 mt-5" />

                <div className="flex justify-between items-center px-5 mt-5">
                  <div className="flex gap-4">
                    <div className="flex gap-2 items-center text-gray-500">
                      <span>
                        <MdOutlineRemoveRedEye className="w-4 h-4" />
                      </span>
                      <p className="text-xs">{bookmark?.views}</p>
                    </div>
                    <div className="flex gap-2 items-center text-gray-500">
                      <span>
                        <IoMdTime className="w-4 h-4" />
                      </span>
                      <p className="text-xs">
                        {new Date(bookmark?.datePosted).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="">
                      <BsPin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookmark;
