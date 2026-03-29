"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = () => {
  const [isBackHovered, setIsBackHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const isProjectDetail = pathname.startsWith("/portfolio/");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {isProjectDetail && (
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                  return;
                }

                router.push("/");
              }}
              onMouseEnter={() => setIsBackHovered(true)}
              onMouseLeave={() => setIsBackHovered(false)}
              className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors group"
            >
              <motion.div
                animate={
                  isBackHovered
                    ? {
                        x: [0, -4, 0],
                      }
                    : { x: 0 }
                }
                transition={{
                  repeat: isBackHovered ? Infinity : 0,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
              >
                <ArrowLeft size={20} />
              </motion.div>
              <span className="font-noto text-sm font-medium">Back</span>
            </button>
          )}
        </div>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
