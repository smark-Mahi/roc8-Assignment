"use client";
import { Suspense, useState } from "react";
import Navbar from "../../components/Navbar";
import { useGlobalStates } from "../../store/globalState";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "../loading";

const Favourite = () => {
  const { favourites, deleteFromFavourites } = useGlobalStates();
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  return (
    <div className="lg:container">
      <Navbar />
      {/* favourite list of images */}
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen">
          {favourites.length === 0 ? (
            <div className="flex justify-center items-center mx-2">
              <p className="text-2xl">You have not added any favourites yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
              {favourites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-gray-300 group/item hover:opacity-60 border-solid border-[1.5px] border-[#cfcdcd8a] rounded-md overflow-hidden relative"
                >
                  <Image
                    src={fav.largeImageURL}
                    alt={fav.tags}
                    width={400}
                    height={400}
                    className={`${
                      isFullyLoaded ? "opacity-100" : "opacity-0"
                    }  aspect-square w-full  object-cover transition-opacity group-hover:scale-125 group-hover:ease-in-out 
                  group-hover:transition-all group-hover:duration-700 duration-500`}
                    onLoad={(e) => setIsFullyLoaded(true)}
                  />
                  {isFullyLoaded && (
                    <span
                      className="invisible group-hover/item:visible absolute bottom-2 right-2 bg-white flex w-8 h-8 items-center justify-center rounded-full"
                      onClick={() => deleteFromFavourites(fav)}
                    >
                      <AiOutlineDelete role="button" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default Favourite;
