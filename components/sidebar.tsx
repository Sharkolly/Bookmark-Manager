"use client";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import { PiArchiveDuotone } from "react-icons/pi";
import { RiHome6Line } from "react-icons/ri";
import axios from "axios";
import BouncingLoader from "./BouncingLoader";

type allTagsType = {
  id: number;
  name: string;
  appears: number;
};

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

type Props = {
  menu: boolean;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const Sidebar = ({ menu, tags, setTags }: Props) => {
  const [allTags, setAllTags] = useState<allTagsType[] | []>([]);
  const [loading, setLoading] = useState(false);

  const addTagsToArr = (t: string) => {
    if (!tags.includes(t)) {
      setTags([...tags, t]);
    } else {
      setTags(tags.filter((tag) => tag !== t));
    }
  };

  useEffect(() => {
    const getTags = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/bookmark");
        const sortedTags = response.data.bookmarks
          .flatMap((b: AllBookMarkType) => [...b.categories])
          .reduce((acc: allTagsType[], tag: string) => {
            const existingTag = acc.find((t) => t.name === tag);
            if (!existingTag) {
              acc.push({ id: acc.length + 1, name: tag, appears: 1 });
            } else {
              existingTag.appears += 1;
            }
            return acc;
          }, [])
          .sort((a: allTagsType, b: allTagsType) =>
            a.name.localeCompare(b.name),
          );
        setAllTags(sortedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    getTags();
  }, []);

  return (
    <div
      className={`h-screen w-[25%] max-xl:w-[30%] max-lg:w-[35%] max-md:w-[60%] fixed top-0 left-0 bg-gray-100/50 max-md:bg-white ${menu == false && "max-md:hidden"}`}
    >
      <div className=" h-screen overflow-scroll py-5 px-7">
        <div className="mt-2 mb-7 flex items-center gap-2">
          <div className="bg-green-800 w-8 h-8 rounded-md flex items-center justify-center">
            <FaBookmark className="w-4 h-4 text-white " />
          </div>
          <p className="font-bold text-xl text-black">Bookmark Manager</p>
        </div>

        <div className="my-5 space-y-3">
          <div className="flex gap-2 items-center text-black bg-gray-500/20 py-2 px-3 rounded-md font-medium">
            <span>
              <RiHome6Line className="w-5 h-5 " />
            </span>
            <h1>Home</h1>
          </div>
          <div className="flex gap-2 items-center py-2 px-3 rounded-md">
            <span>
              <PiArchiveDuotone className="w-5 h-5 " />
            </span>
            <h1>Archived</h1>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium">TAGS</p>
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center items-center h-[60vh] ">
                <BouncingLoader />
              </div>
            ) : (
              allTags.map((tag) => (
                <div key={tag.id} className="flex justify-between items-center">
                  <div className="flex gap-2 items-center py-2 px-3 rounded-md">
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        name={tag.name}
                        id={String(tag.id)}
                        onChange={() => addTagsToArr(tag.name)}
                      />
                    </span>
                    <p className="text-sm capitalize font-medium">{tag.name}</p>
                  </div>
                  <div className="w-2 h-2 flex justify-center items-center rounded-full bg-gray-300/50 p-2.5">
                    <p className="text-xs font-medium text-gray-500">
                      {tag.appears}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
