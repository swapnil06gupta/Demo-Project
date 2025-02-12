/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRouter } from "next/navigation";

const contact = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Contact</h1>
      <button onClick={() => router.push("/about")}>home</button>
    </div>
  );
};

export default contact;
