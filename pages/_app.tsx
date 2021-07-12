import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { GoogleFonts } from "next-google-fonts";
import { Windmill } from "@windmill/react-ui";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/navbar";
import "../css/tailwind.css";
import SocialIcons from "components/layout/socialIcons";

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Head>

      <Windmill usePreferences>
        <Navbar />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <div className="relative min-h-screen" key={router.route}>
            <Component {...pageProps} />
          </div>
        </AnimatePresence>
        <div className="flex justify-center py-8">
          <SocialIcons />
        </div>
      </Windmill>
    </>
  );
};
export default App;
