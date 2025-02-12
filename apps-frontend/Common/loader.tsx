"use client";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export const showLoader = (open: boolean) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
