"use client";
import { Hits } from "@/types/searchData";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";
import { IoIosHeartEmpty } from "react-icons/io";
import { useGlobalStates } from "@/store/globalState";
import SearchResultsDetailsModal from "@/modals/SearchResultsDetailsModal";

const Card = ({ images }: { images: Hits }) => {
  //States
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { addToFavourites, addToDownloadedSection } = useGlobalStates();

  useEffect(() => {
    setIsFullyLoaded(true);
  }, [images]);

  //Functions
  const close: () => void = () => setOpenModal(false);

  async function downloadImage(name: string, type: string, image: Hits) {
    // downloading images
    const imageBlob = await fetch(name)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/png" }));
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = type;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToDownloadedSection(image);
  }
  return (
    <div>
      <div className="group/item hover:opacity-60 w-full relative bg-gray-300 break-inside-avoid mb-1 rounded-md overflow-hidden cursor-pointer">
        <img
          onClick={() => setOpenModal(true)}
          src={images.largeImageURL}
          alt={images.tags}
          className={`${
            isFullyLoaded ? "opacity-100" : "opacity-0"
          } max-w-full transition-opacity group-hover:scale-125 group-hover:ease-in-out 
      group-hover:transition-all group-hover:duration-700 duration-500`}
          // loading="lazy"
          // onLoad={(e) => setIsFullyLoaded(true)}
        />
        {isFullyLoaded && (
          <>
            {/* download the image */}
            <span
              className="invisible group-hover/item:visible absolute bottom-2 right-2 bg-white flex w-8 h-8 items-center justify-center rounded-full"
              onClick={() =>
                downloadImage(images.largeImageURL, images.tags, images)
              }
            >
              <TbDownload role="button" />
            </span>
            {/* add to favourite list */}
            <span
              className="invisible group-hover/item:visible absolute bottom-2 right-12 bg-white flex w-8 h-8 items-center justify-center rounded-full"
              onClick={() => addToFavourites(images)}
            >
              <IoIosHeartEmpty role="button" />
            </span>
          </>
        )}
      </div>
      {openModal && (
        <SearchResultsDetailsModal
          opened={openModal}
          onClose={close}
          imageDetails={images}
        />
      )}
    </div>
  );
};

export default Card;
