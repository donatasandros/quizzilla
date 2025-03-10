import { Font, Head, Html, Tailwind } from "@react-email/components";
import * as React from "react";

export function Base({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                gray: {
                  25: "#FCFCFD",
                  50: "#F9FAFB",
                  100: "#F2F4F7",
                  200: "#EAECF0",
                  300: "#D0D5DD",
                  400: "#98A2B3",
                  500: "#667085",
                  600: "#475467",
                  700: "#344054",
                  800: "#182230",
                  900: "#101828",
                  950: "#0C111D",
                },
                brand: {
                  25: "#FCFAFF",
                  50: "#F9F5FF",
                  100: "#F4EBFF",
                  200: "#E9D7FE",
                  300: "#D6BBFB",
                  400: "#B692F6",
                  500: "#9E77ED",
                  600: "#7F56D9",
                  700: "#6941C6",
                  800: "#53389E",
                  900: "#42307D",
                  950: "#2C1C5F",
                },
              },
            },
          },
        }}
      >
        {children}
      </Tailwind>
    </Html>
  );
}
