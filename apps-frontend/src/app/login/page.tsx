/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Box,
  Button,
  Divider,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import "@fontsource/poppins";
import "../../../styles/main.scss";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBaseStore } from "@/store/basicStore";
import { useEffect } from "react";
import { showLoader } from "../../../Common/loader";
import axiosInstance from "@/utils/axiosInstance";

const fieldSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be 3 a character")
    .max(12, "Password is more then 16 character"),
});
type TfieldSchema = z.infer<typeof fieldSchema>;

export default function login() {
  const loader = useBaseStore((state) => state.loader);
  const setLoader = useBaseStore((state) => state.setLoader);
  const routes = useRouter();

  useEffect(() => {
    setLoader(false);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TfieldSchema>({
    resolver: zodResolver(fieldSchema),
  });

  const submitLogin = async (data: FieldValues) => {
    setLoader(true);
    try {
      await axiosInstance.post("/app/login", data, {
        withCredentials: true,
      });
      reset();
      routes.push("/about");
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div>
        <Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "20%",
              marginTop: "140px",
              minHeight: "600px",
            }}
          >
            <form onSubmit={handleSubmit(submitLogin)}>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "30px",
                }}
              >
                Welcome back!
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  marginBottom: "50px",
                }}
              >
                Enter your credentials to access your account
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px 0px",
                }}
              >
                <Typography className="custom-typography">
                  Email address
                </Typography>
                <TextField
                  {...register("email")}
                  placeholder="Enter your email"
                  className="custom-textfield"
                ></TextField>
                {errors?.email?.message && (
                  <FormHelperText error>
                    {errors?.email?.message}
                  </FormHelperText>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px 0px",
                }}
              >
                <Typography className="custom-typography">Password</Typography>
                <TextField
                  {...register("password")}
                  placeholder="Password"
                  className="custom-textfield"
                ></TextField>
                {errors?.password?.message && (
                  <FormHelperText error>
                    {errors?.password?.message}
                  </FormHelperText>
                )}
              </Box>
              <Button
                disableElevation
                disabled={Object.keys(errors).length > 0 ? true : false}
                type="submit"
                style={{
                  margin: "10px 0px",
                  textTransform: "capitalize",
                  width: "80%",
                  backgroundColor:
                    Object.keys(errors).length > 0 ? "grey" : "#3A5B22",
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
                variant="contained"
              >
                Login
              </Button>
            </form>
            <Divider
              sx={{ margin: "40px 0px", width: "80%", fontSize: "10px" }}
            >
              Or
            </Divider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                margin: "20px 0px 10px 0px",
              }}
            >
              <Button
                disableElevation
                variant="contained"
                className="icon-button"
                style={{
                  width: "38%",
                  border: "1px solid #d9d9d9",
                  textTransform: "capitalize",
                  backgroundColor: "transparent",
                  margin: "10px 15px 10px 0px",
                }}
              >
                <Image
                  className="dark:invert"
                  src="/googleIcon.svg"
                  alt="google.js logo"
                  width={24}
                  height={24}
                  style={{ marginRight: "10px" }}
                  priority
                />
                Sign in with Google
              </Button>
              <Button
                disableElevation
                variant="contained"
                className="icon-button"
                style={{
                  width: "38%",
                  border: "1px solid #d9d9d9",
                  textTransform: "capitalize",
                  backgroundColor: "transparent",
                  margin: "10px 0px 10px 15px",
                }}
              >
                <Image
                  className="dark:invert"
                  src="/appleIcon.svg"
                  alt="apple.js logo"
                  width={24}
                  height={24}
                  style={{ marginRight: "10px" }}
                  priority
                />
                Sign in with Apple
              </Button>
            </Box>
            <Typography
              sx={{
                width: "80%",
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Don&apos;t Have an account?
              <Button
                disableElevation
                disableRipple
                onClick={() => routes.push("/signup")}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#0F3DDE",
                  textTransform: "capitalize",
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Grid>
      </div>
      {loader && showLoader(loader)}
    </>
  );
}
