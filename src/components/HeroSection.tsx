"use client";
import { Suspense, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Card from "./Card";
import { getAllSearchResuslts } from "@/lib/fetchSearchResults";
import { SearchData } from "@/types/searchData";
import useDebounce from "@/Hooks/useDebounce";
import Navbar from "./Navbar";
import Loader from "./Loader";
import Loading from "@/app/loading";

const HeroSection = () => {
  //States
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchByCategory, setSearchByCategory] = useState<string>("");
  const [getData, setGetData] = useState<null | SearchData>(null);

  //Hooks
  const searchKey = useDebounce(searchValue || searchByCategory, 1000);

  //Functions
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  //Fetching Search Result
  async function getResults() {
    const data = await getAllSearchResuslts(searchKey.toLowerCase());
    setGetData(data);
    console.log(data);
    return data;
  }

  useEffect(() => {
    getResults();
  }, [searchKey]);

  return (
    <div className="lg:container">
      {/* Hero Section */}
      <section
        className={`${
          searchKey ? "min-h-[60vh]" : "min-h-screen"
        } flex flex-col  text-white imageSlider bg-center bg-no-repeat`}
      >
        {/* Navbar  */}
        <Navbar />

        {/* Hero Section Content  */}
        {!searchKey && (
          <h1 className="heroSection-text mt-12 font-bold text-center self-center leading-relaxed">
            Discover over 2,000,000 free Stock Images
          </h1>
        )}
        <div className="xl:w-[30%] sm:w-[50%] self-center mt-20 flex items-center justify-between h-fit py-2 px-4 bg-[rgba(37,37,51,0.93)] border-solid border-2 border-[#a09f9f] rounded-md ">
          <div className="w-full flex items-center">
            <CiSearch className="text-xl" />
            &nbsp;|&nbsp;
            <input
              value={searchValue}
              type="text"
              placeholder="search"
              className="bg-transparent w-full outline-none"
              onChange={handleChange}
            />
          </div>
          <button className="btn-style">Go!</button>
        </div>
        {searchKey ? (
          <p className="heroSection-text mt-12 mb-4 font-bold text-center self-center leading-relaxed">
            Results: {searchValue || searchByCategory}
          </p>
        ) : (
          <p className="w-fit text-sm  self-center mt-4 py-1 px-4 bg-[rgba(37,37,51,0.93)] border-solid border-2 border-[#a09f9f] rounded-md">
            Trending: flowers, love, forest, river
          </p>
        )}
      </section>

      {/* search results */}
      <Suspense fallback={<Loading />}>
        <section className="min-h-screen">
          {/* search by category */}
          <div className="text-sm bg-[#cfcdcd8a] grid md:grid-cols-8 grid-cols-4 gap-2 py-6 px-4">
            {[
              "All",
              "Fashion",
              "Nature",
              "Science",
              "Places",
              "Feelings",
              "Religion",
              "Health",
              "Food",
              "Animals",
              "Buildings",
              "Sports",
              "Bussiness",
              "Travel",
              "Industry",
              "Music",
            ].map((category, i) => (
              <p
                key={i}
                className="categoriesText-style "
                onClick={() =>
                  setSearchByCategory(category === "All" ? "" : category)
                }
              >
                {category}
              </p>
            ))}
          </div>
          {/* loading animation */}
          {!getData ? (
            <Loader />
          ) : (
            // search Results
            <div className="px-4 py-8 columns-2 md:columns-3 xl:columns-5 gap-1">
              {getData?.hits.map((images, i) => (
                <Card images={images} key={i} />
              ))}
            </div>
          )}
        </section>
      </Suspense>
    </div>
  );
};

export default HeroSection;
