"use client";
import { Hits } from "@/types/searchData";
import { Checkbox, Modal, Table } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SearchResultsDetailsModal = ({
  opened,
  onClose,
  imageDetails,
}: {
  opened: boolean;
  onClose: () => void;
  imageDetails: Hits;
}) => {
  const [windowWidth, setWindoWidth] = useState(window.innerWidth);

  const handleWindowWidth = () => {
    setWindoWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidth);

    return () => {
      window.removeEventListener("resize", handleWindowWidth);
    };
  }, [windowWidth]);

  const downloadDetails = [
    { size: "Small", sizeInPixels: "640x960" },
    { size: "Medium", sizeInPixels: "1920x2660" },
    { size: "Big", sizeInPixels: "2400x3600" },
    { size: "Original", sizeInPixels: "3850x5640" },
  ];

  if (!opened) return null;
  console.log(imageDetails, "det");

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={windowWidth > 1500 ? "50%" : "xl"}
      title={<h1>Preview ID: {imageDetails.id}</h1>}
    >
      <div className={`flex flex-col gap-4 py-6 `}>
        <div className=" relative bg-white rounded-t-lg ">
          <img
            alt={imageDetails.tags}
            className="object-contain w-full rounded-lg overflow-hidden"
            width={400}
            height={400}
            loading="lazy"
            src={imageDetails.largeImageURL}
          />
        </div>
        <div className="flex flex-col ">
          <h1 className="text-lg md:text-xl font-bold ">Download</h1>
          <div className="mt-4">
            <Table highlightOnHover withTableBorder>
              <Table.Tbody>
                {downloadDetails.map((details, i) => (
                  <Table.Tr key={i}>
                    <Table.Td>{details.size}</Table.Td>
                    <Table.Td>{details.sizeInPixels}</Table.Td>
                    <Table.Td>
                      {" "}
                      {i === 0 ? (
                        <Checkbox defaultChecked color="lime" radius="lg" />
                      ) : (
                        <Checkbox radius="lg" />
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          <div className="mt-4 w-full">
            <button className="h-8 w-full bg-black text-white mx-20 rounded-md">
              Download for free!
            </button>
          </div>
          <h1 className="text-lg md:text-xl self-start font-bold mt-4">
            Information
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 place-content-start mt-8">
            <div className="my-10 bg-red-300">
              <p className="text-sm text-gray-300">User</p>
              <p className="font-semibold">{imageDetails.user}</p>
            </div>
            <div className="my-10 bg-red-300">
              <p className="text-sm text-gray-300">User ID</p>
              <p className="font-semibold">{imageDetails.user_id}</p>
            </div>
            <div className="my-10 bg-red-300">
              <p className="text-sm text-gray-300">Type</p>
              <p className="font-semibold">{imageDetails.type}</p>
            </div>
            <div className="my-10 bg-red-300">
              <p className="text-sm text-gray-300">Views</p>
              <p className="font-semibold">{imageDetails.views}</p>
            </div>
            <div className="my-10 bg-red-300">
              <p className="text-sm text-gray-300">Downloads</p>
              <p className="font-semibold">{imageDetails.downloads}</p>
            </div>
            <div className="my-10 bg-red-300">
              <p className="text-sm text-gray-300">Likes</p>
              <p className="font-semibold">{imageDetails.likes}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchResultsDetailsModal;
