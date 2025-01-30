import React from "react";
import { Bot } from "lucide-react";
import ThemeToggleButton from "../ThemeToggleButton";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="mt-2 text-black dark:text-white bg-white dark:bg-black">
        <div className="z-[30] md:mx-10 mx-2 flex flex-wrap gap-1.5 items-center justify-between p-2">
          <a
            href="/"
            className="flex items-center space-x-3 text-white rtl:space-x-reverse"
          >
            <div className="flex size-10 shrink-0 aspect-square rounded-full dark:shadow-current dark:shadow-sm shadow-none border dark:bg-violet-950 bg-violet-700 border-violet-700 justify-center items-center">
              <img src="/logo.png" className="h-[30px] w-[36px] text-white" />
            </div>
            <div className="py-auto">
              <span
                className="text-[22px] text-black md:text-[24px] dark:text-white"
                style={{ lineHeight: "32px", fontWeight: "700" }}
              >
                Solanisation
              </span>
            </div>
          </a>
          <div>
            <div className="md:mx-8 bg-white dark:bg-black" id="navbar-default">
              <div className="flex items-center gap-3">
                <ThemeToggleButton />
                <Link href="/sign-in">
                  <button className="dark:shadow-current dark:shadow-sm shadow-none sm:px-4 px-3 py-1.5 rounded-[8px] border dark:bg-violet-950 bg-violet-700 border-violet-700 text-white">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
