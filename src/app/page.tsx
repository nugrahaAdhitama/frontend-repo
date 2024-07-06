"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/token";

import Signin from "./auth/signin/page";

export default function Home() {
  const router = useRouter();
  const storedToken = getToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth/signin");
    } else {
      router.push("/dashboard");
    }
    setIsLoading(false);
  }, [storedToken, router]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
