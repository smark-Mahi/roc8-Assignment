"use client";
import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  function handleLogin() {
    signIn("github");
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex flex-col justify-around h-48 gap-2 px-4 rounded-sm ring-1  md:min-w-96 w-80">
        <h1 className="font-bold text-2xl self-center">Sign Up or Log In</h1>
        <button
          key="github"
          className="bg-slate-800 h-10 rounded-md ring-2 "
          onClick={handleLogin}
        >
          <p className="flex justify-around items-center text-white">
            <FaGithub className="text-2xl" /> Log In With GitHub
          </p>
        </button>
        <button
          key="google"
          className="bg-orange-500 h-10 rounded-md ring-2"
          onClick={() => signIn("google")}
        >
          <p className="flex justify-around items-center text-white">
            <FaGoogle className="text-2xl" />
            Log In With Google
          </p>
        </button>
      </div>
    </div>
  );
};

export default Login;
