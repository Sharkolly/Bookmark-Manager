import { IoMdClose } from "react-icons/io";
import {useRouter} from 'next/navigation';


const AddBookmark = () => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <div className="fixed z-200 bg-gray-600/80 top-0 left-0 bottom-0 right-0 ">
      <div className="w-[35%] max-lg:w-[75%] max-md:w-[85%] mx-auto bg-white  mt-15  rounded-lg  py-7  shadow-lg">
        <div className="flex justify-end px-4">
          <div className="p-1  rounded-md cursor-pointer" onClick={goBack}>
            <IoMdClose className="text-2xl text-red-600 " />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-center">Add New Bookmark</h1>

          <form className="px-6 mt-5 space-y-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-sm font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="Description" className="text-sm font-medium">
                Description:
              </label>
              <input
                type="text"
                id="Description"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="link" className="text-sm font-medium">
                Link:
              </label>
              <input
                type="text"
                id="link"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 items-center w-full">
              <div className="flex flex-col gap-1 flex-1 basis-[30%] max-md:w-40">
                <label htmlFor="link" className="text-sm font-medium">
                  Category:
                </label>
                <input
                  type="text"
                  id="link"
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 basis-[30%] max-md:w-40">
                <label htmlFor="link" className="text-sm font-medium">
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 basis-[30%] w-16">
                <label htmlFor="link" className="text-sm font-medium">
                  Views:
                </label>
                <input
                  type="number"
                  id="views"
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex mt-14">
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Add Bookmark
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddBookmark;
