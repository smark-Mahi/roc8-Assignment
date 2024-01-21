"use client";
import { Hits } from "@/types/searchData";
import { Button, Checkbox, Modal, Table } from "@mantine/core";
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
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);
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
console.log(imageDetails,'det')

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={windowWidth > 1000 ? "50%" : windowWidth > 500 ? "md" : "sm"}
      title={<h1>Preview ID: {imageDetails.id}</h1>}
    >
      <main className="flex flex-col lg:flex-row  py-6 gap-6">
        <div className="rounded-md overflow-hidden  w-full relative">
          <Image
            src={imageDetails.largeImageURL}
            alt={imageDetails.tags}
            fill={true}
            className={`${
              isFullyLoaded ? "opacity-100" : "opacity-0"
            }  object-contain transition-opacity group-hover:scale-125 group-hover:ease-in-out 
      group-hover:transition-all group-hover:duration-700 duration-500`}
            loading="lazy"
            onLoad={(e) => setIsFullyLoaded(true)}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold">Download</h1>
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
          <Button color="green" className="mt-4">
            Download for free!
          </Button>
          <h1 className="text-lg md:text-xl self-start font-bold mt-4">
            Information
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 place-content-start mt-10 gap-4">
            <div>
              <p className="text-sm text-gray-300">User</p>
              <p className="font-semibold">{imageDetails.user}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">User ID</p>
              <p className="font-semibold">{imageDetails.user_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Type</p>
              <p className="font-semibold">{imageDetails.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Views</p>
              <p className="font-semibold">{imageDetails.views}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Downloads</p>
              <p className="font-semibold">{imageDetails.downloads}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Likes</p>
              <p className="font-semibold">{imageDetails.likes}</p>
            </div>
          </div>
        </div>
      </main>
      <div></div>
    </Modal>
  );
};

export default SearchResultsDetailsModal;
