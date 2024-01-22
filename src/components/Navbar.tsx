"use client";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { useGlobalStates } from "@/store/globalState";
import { FaHeart } from "react-icons/fa6";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { favourites } = useGlobalStates();
  const { status } = useSession();
  const router = useRouter();
  function logoutHandler() {
    signOut();
  }

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status]);

  return (
    <div className="flex flex-col items-center h-fit py-2 px-4 bg-[rgba(82,82,112,0.9)] border-solid border-2 border-[#a09f9f] rounded-md md:m-8 m-4">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="nav-text cursor-pointer">
          HomePage
        </Link>
        {/*Desktop Navbar  */}
        <nav className="hidden md:flex gap-5 cursor-pointer">
          <Link
            href="/history"
            className="nav-text duration-300 ease-linear transition-all hover:text-opacity-30 hover:underline"
          >
            History
          </Link>
          {status === "authenticated" && (
            <p
              className="nav-text duration-300 ease-linear transition-all hover:text-opacity-30 hover:underline"
              onClick={logoutHandler}
            >
              Logout
            </p>
          )}
          {status === "unauthenticated" && (
            <Link
              href="/login"
              className="nav-text duration-300 ease-linear transition-all hover:text-opacity-30 hover:underline"
            >
              Login
            </Link>
          )}
          {status !== "authenticated" && (
            <Link href="/login">
              <button className="btn-style">Create Account</button>
            </Link>
          )}
          <Link href="/favourites">
            {favourites.length === 0 ? (
              <IoIosHeartEmpty className="text-2xl" role="button" />
            ) : (
              <FaHeart className="text-2xl text-red-500" role="button" />
            )}
          </Link>
        </nav>
        {/* mobile nav */}
        <button
          id="hamburger-button"
          className="relative block h-8 w-8 cursor-pointer text-3xl md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div
            className={`${
              openMenu
                ? "before:translate-y-0 before:rotate-45 after:translate-y-0 after:-rotate-45 rotate-[720deg] bg-transparent"
                : "before:-translate-x-4 bg-white before:-translate-y-3 after:-translate-x-4 after:translate-y-3"
            } absolute top-4 -mt-0.5 h-1 w-8 rounded  transition-all duration-500 
                before:absolute before:h-1 before:w-8 
                 before:rounded before:bg-white before:transition-all before:duration-500 before:content-[''] 
                 after:absolute after:h-1 after:w-8  after:rounded
                  after:bg-white after:transition-all after:duration-500 after:content-['']`}
          ></div>
        </button>
      </div>
      <section
        id="mobile-menu"
        className={`${
          !openMenu && "hidden"
        } justify-center w-full origin-top animate-open-menu flex-col text-center  rounded-b-sm`}
      >
        <nav
          className="flex flex-col w-full h-fit cursor-pointer"
          aria-label="mobile"
        >
          <Link
            href="/history"
            className="nav-text w-full  py-6 hover:opacity-60 "
          >
            History
          </Link>
          <Link
            href="/favourites"
            className="nav-text w-full  py-6 hover:opacity-60 "
          >
            Favourite
          </Link>
          {status === "authenticated" && (
            <p
              className="nav-text w-full  py-6 hover:opacity-60 "
              onClick={logoutHandler}
            >
              Logout
            </p>
          )}
          {status === "unauthenticated" && (
            <Link
              href="/login"
              className="nav-text w-full  py-6 hover:opacity-60 "
            >
              Login
            </Link>
          )}
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
