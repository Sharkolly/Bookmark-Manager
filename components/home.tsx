"use client";
import { IoAdd } from "react-icons/io5";
import Bookmark from "./bookmarks";
import { FaBookmark } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { ChangeEvent, SetStateAction, useState } from "react";
import { AllBookMarkType } from "@/types/app.types";

type HomeProps = {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  tags: string[];
  handleTabChange: (tab: string) => void;
  allBookmarks: AllBookMarkType[] | [];
  setAllBookmarks: React.Dispatch<SetStateAction<[] | AllBookMarkType[]>>;
  pinnedBookmarks: AllBookMarkType[];
  setPinnedBookmarks: React.Dispatch<React.SetStateAction<AllBookMarkType[]>>;
};

const Home = ({
  menu,
  setMenu,
  tags,
  handleTabChange,
  allBookmarks,
  setAllBookmarks,
  pinnedBookmarks,
  setPinnedBookmarks,
}: HomeProps) => {
  const toggleMenu = () => setMenu(!menu);
  const [searchBookmark, setSearchBookmark] = useState("");

  const searchInput = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
    setSearchBookmark(e.target.value);

  return (
    <div className="w-full  ml-[25%] max-xl:ml-[30%] max-lg:ml-[35%] max-md:ml-0">
      <div className="pt-5 pb-4 flex items-center justify-between bg-white px-7  border shadow-md max-md:px-6 md:hidden">
        <div className="flex items-center gap-2">
          <div className="bg-green-800 w-8 h-8 rounded-md flex items-center justify-center">
            <FaBookmark className="w-4 h-4 text-white " />
          </div>
          <p className="font-bold text-xl text-black">Bookmark Manager</p>
        </div>
        <div>
          <div onClick={toggleMenu} className="cursor-pointer">
            <RxHamburgerMenu className="text-2xl" />
          </div>
        </div>
      </div>

      <div className="py-3.5 px-7 shadow-md bg-white max-md:px-6">
        <div className="bg-white flex justify-between items-center">
          <div>
            <input
              type="search"
              className="border-2 border-gray-300 px-3 py-1.5 rounded-lg w-[150%] outline-none max-lg:w-full "
              name=""
              onChange={(e) => searchInput(e)}
              placeholder="Search by title..."
            />
          </div>

          <div className="flex gap-6 max-md:gap-0 items-center">
            <div className="cursor-pointer">
              <button
                className="flex gap-2 bg-green-900 px-4 py-2.5 rounded-lg items-center justify-center max-md:px-2 max-md:py-2 cursor-pointer "
                onClick={() => handleTabChange("add-bookmark")}
              >
                <span>
                  <IoAdd className="text-white w-5 h-5" />
                </span>
                <p className="font-medium text-white">Add Bookmark</p>
              </button>
            </div>

            {/* <div> */}
            {/* <div className="border-green-800 border-2 w-12 h-12 rounded-full max-md:hidden"></div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      <Bookmark
        searchBookmark={searchBookmark}
        tags={tags}
        allBookmarks={allBookmarks}
        setAllBookmarks={setAllBookmarks}
      />
    </div>
  );
};

export default Home;
