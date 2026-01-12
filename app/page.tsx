"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./_components/navbar";
import Logo from "./_components/logo";
import Hero from "./(home)/_components/hero";

export default function Home() {
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowNavbarLogo(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <LayoutGroup>
      <Navbar showLogo={showNavbarLogo} />

      <AnimatePresence>
        {!showNavbarLogo && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-40"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* SAME LOGO COMPONENT */}
            <Logo iconSize={100} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-auto w-full">
        <Hero/>
      </main>
    </LayoutGroup>
  );
}
