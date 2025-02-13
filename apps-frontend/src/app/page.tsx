"use client";

import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { showLoader } from "../../Common/loader";
import { useBaseStore } from "@/store/basicStore";
import axiosInstance from "@/utils/axiosInstance";

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const loader = useBaseStore((state) => state.loader);
  const setLoader = useBaseStore((state) => state.setLoader);
  const routes = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/app");
        setMessage(response?.data?.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const signup = async () => {
    setLoader(true);
    setTimeout(() => {
      routes.push("/signup");
    }, 1000);
  };

  return (
    <div>
      <Typography variant="h1">{message}</Typography>
      <Button variant="contained" onClick={signup}>
        Sign Up
      </Button>
      {loader && showLoader(loader)}
    </div>
  );
};
export default Home;
