"use client";
import { BsPin } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import React, { SetStateAction, useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { LuArrowDownUp } from "react-icons/lu";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import BouncingLoader from "./BouncingLoader";
import { AllBookMarkType } from "@/types/app.types";
import { TbPinnedFilled } from "react-icons/tb";

const Bookmark = ({
  searchBookmark,
  tags,
  allBookmarks,
  setAllBookmarks,
}: {
  searchBookmark: string;
  tags: string[];
  allBookmarks: AllBookMarkType[] | [];
  setAllBookmarks: React.Dispatch<SetStateAction<[] | AllBookMarkType[]>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [toggleOptions, setToggleOptions] = useState<number | undefined>(
    undefined,
  );
  const [toggleOptionsClick, setToggleOptionsClick] = useState(false);

  const toggleOptionsBtn = (id: number) => {
    const toggledBookmark = allBookmarks.find((bookmark) => bookmark.id === id);
    if (toggleOptions !== toggledBookmark?.id && toggleOptionsClick) {
      setToggleOptions(toggledBookmark?.id);
      setToggleOptionsClick(true);
      return;
    }

    setToggleOptions(toggledBookmark?.id);
    setToggleOptionsClick(!toggleOptionsClick);
  };

  const togglePinBookmarks = (id: number) => {
    const update_bookmark = async () => {
      try {
        const { data } = await axios.patch("/api/bookmark", {
          id,
        });
      } catch (error) {
        console.error("Error updating bookmark:", error);
      }
    };

    const updatedBookmarks = allBookmarks.map((bookmark) =>
      bookmark.id === id ? { ...bookmark, pinned: !bookmark.pinned } : bookmark,
    );

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setAllBookmarks(updatedBookmarks);
    update_bookmark();
  };

  useEffect(() => {
    if (allBookmarks.length == 0) {
      const getBookmarks = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/api/bookmark");
          localStorage.setItem(
            "bookmarks",
            JSON.stringify(response.data.bookmarks),
          );
          console.log(response.data.bookmarks);
          setAllBookmarks(response.data.bookmarks);
        } catch (error) {
          console.error("Error fetching tags:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      };
      getBookmarks();
    }
  }, []);

  const deleteBookmark = (id: number) => {
    const updatedBookmarks = allBookmarks.filter(
      (bookmark) => bookmark.id !== id,
    );

    const deleteBookmarkFunction = async () => {
      try {
        const { data } = await axios.delete("/api/bookmark", {
          data: { id },
        });
      } catch (error) {
        console.error("Error deleting bookmark:", error);
      }
    };

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setAllBookmarks(updatedBookmarks);
    deleteBookmarkFunction();
  };

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
      ) : newBookmark.length > 0 ? (
        <>
          <div className="flex justify-between">
            <h1 className="text-green-900 text-xl font-semibold">
              All bookmarks
            </h1>
            {/* <button className="flex gap-1 items-center bg-white py-2 px-4 rounded-md border">
              <span>
                <LuArrowDownUp />
              </span>
              <span>Sort by</span>
            </button> */}
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

                    <div className="border border-gray-300 p-2 rounded-md cursor-pointer relative">
                      <SlOptionsVertical
                        className="text-gray-700"
                        onClick={() => toggleOptionsBtn(bookmark.id)}
                      />
                      {toggleOptions === bookmark?.id && toggleOptionsClick && (
                        <div className="absolute bg-slate-100 top-12  -left-20 -right-5 rounded-md z-10 shadow-md">
                          <div className="flex flex-col">
                            <Link
                              href={bookmark?.link}
                              className="flex items-center gap-2 px-4 py-3 border-b border-white"
                            >
                              {" "}
                              <span>
                                <MdOutlineRemoveRedEye className="w-4 h-4" />
                              </span>
                              <p className="text-sm text-green-800">View</p>
                            </Link>
                            <button
                              onClick={() => togglePinBookmarks(bookmark.id)}
                              className="flex items-center gap-2 px-4 py-3 border-b border-white cursor-pointer"
                            >
                              {" "}
                              <span>
                                {bookmark.pinned ? (
                                  <TbPinnedFilled className="w-5 h-5" />
                                ) : (
                                  <BsPin className="w-5 h-5" />
                                )}
                              </span>
                              {bookmark.pinned ? (
                                <p className="text-sm text-yellow-700">Unpin</p>
                              ) : (
                                <p className="text-sm text-yellow-700">Pin</p>
                              )}
                            </button>
                            <button
                              onClick={() => deleteBookmark(bookmark.id)}
                              className="flex items-center gap-2 px-4 py-3 cursor-pointer"
                            >
                              {" "}
                              <span>
                                <MdOutlineRemoveRedEye className="w-4 h-4" />
                              </span>
                              <p className="text-sm text-red-800">Delete</p>
                            </button>
                          </div>
                        </div>
                      )}
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
                    <button
                      className="cursor-pointer"
                      onClick={() => togglePinBookmarks(bookmark.id)}
                    >
                      {bookmark.pinned ? (
                        <TbPinnedFilled className="w-5 h-5" />
                      ) : (
                        <BsPin className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="flex justify-center items-center w-full h-[80vh] text-xl font-medium">
            No bookmarks found.
          </p>
        </>
      )}
    </div>
  );
};

export default Bookmark;
