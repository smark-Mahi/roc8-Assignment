"use client";
import Navbar from "@/components/Navbar";
import { useGlobalStates } from "@/store/globalState";
import Image from "next/image";
import { Suspense, useState } from "react";
import Loading from "../loading";

const History = () => {
  const { downloadedImages, clearHistory } = useGlobalStates();
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  return (
    <div className="lg:container">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen">
          {downloadedImages.length !== 0 && (
            // delete all images
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold ">
                <p>{downloadedImages.length} Images Downloaded</p>
              </p>
              <p
                className="text-sm hover:text-red-500 duration-300 ease-linear transition-all hover:text-opacity-60  cursor-pointer"
                onClick={() => clearHistory()}
              >
                clear History
              </p>
            </div>
          )}
          {downloadedImages.length === 0 ? (
            <div className="flex justify-center items-center">
              <p className="text-2xl">You have not download any Image yet.</p>
            </div>
          ) : (
            //show downloaded images
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2 mt-4">
              {downloadedImages.map((downloadeImage) => (
                <div className="bg-gray-300 group/item hover:opacity-60 border-solid border-[1.5px] border-[#cfcdcd8a] rounded-md overflow-hidden relative">
                  <Image
                    src={downloadeImage.largeImageURL}
                    alt={downloadeImage.tags}
                    width={400}
                    height={400}
                    className={`${
                      isFullyLoaded ? "opacity-100" : "opacity-0"
                    }  w-full h-40 sm:h-48 lg:h-72 object-cover transition-opacity group-hover:scale-125 group-hover:ease-in-out 
                  group-hover:transition-all group-hover:duration-700 duration-500`}
                    priority
                    onLoad={(e) => setIsFullyLoaded(true)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default History;
