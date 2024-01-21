"use client";
import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@mantine/core";
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
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-around h-48 min-w-96 gap-2 px-4 rounded-sm border-solid border-[1.5px] border-gray-300">
        <h1 className="font-bold text-2xl self-center">Sign Up or Log In</h1>
        <Button
          key="github"
          leftSection={<FaGithub />}
          color="black"
          onClick={handleLogin}
        >
          Log In With GitHub
        </Button>
        <Button
          key="google"
          leftSection={<FaGoogle />}
          color="orange"
          onClick={() => signIn("google")}
        >
          Log In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
