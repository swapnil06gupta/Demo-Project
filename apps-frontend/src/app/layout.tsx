"use client";
import "./globals.css";
import Grid from "@mui/material/Grid2";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Grid container sx={{ height: "120vh" }}>
            <Grid size={6}>{children}</Grid>
            <Grid
              size={6}
              style={{
                backgroundImage: "url(/hell.webp)",
                backgroundSize: "cover",
                backgroundPosition: "right top",
                height: "100%",
              }}
            ></Grid>
          </Grid>
        </div>
      </body>
    </html>
  );
}
