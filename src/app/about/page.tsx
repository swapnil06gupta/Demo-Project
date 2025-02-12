/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useBaseStore } from "@/store/basicStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const about = () => {
  const router = useRouter();
  const setLoader = useBaseStore((state) => state.setLoader);

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <div>
      <h1>About</h1>
      <button onClick={() => router.push("/contact")}>home</button>
    </div>
  );
};

export default about;
