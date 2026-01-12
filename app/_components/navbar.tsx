"use client";

import { AnimatePresence, motion } from "framer-motion";
import Logo from "./logo";

interface NavbarProps {
  showLogo: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showLogo }) => {
  return (
    <AnimatePresence>
      {showLogo && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-zinc-800"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-16">
              {/* LEFT: LOGO + BRAND */}
              <div className="flex items-center gap-2">
                <Logo iconSize={18} />

                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="text-2xl font-black tracking-tighter text-white select-none"
                >
                  Vibexx
                </motion.span>
              </div>

              {/* RIGHT: NAV LINKS */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="ml-auto hidden md:flex items-center space-x-8"
              >
                <a
                  href="#how-it-works"
                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  How it works
                </a>
                <a
                  href="#pricing"
                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </motion.div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
