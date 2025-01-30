import { UserButton } from "@clerk/nextjs";
import { Bot, Menu, PanelRightCloseIcon, Wallet } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";
import WalletConnection from "./WalletConnection";
import { useState } from "react";

const ChatNav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="fixed z-20 right-0 left-0 flex items-center justify-between px-5 h-[4rem] dark:bg-zinc-800 bg-white md:ml-0">
      <div
        className={`flex items-center ${
          isOpen ? "md:ml-[260px]" : ""
        } transition-all duration-300`}
      >
        {!isOpen && (
          <div className="md:hidden flex gap-3">
            <button onClick={() => setIsOpen(true)}>
              <Menu className="w-7 h-7 dark:text-white text-zinc-900" />
            </button>
            <h1 className="text-xl font-semibold dark:text-white text-zinc-900">
              Solanisation
            </h1>
          </div>
        )}
        <div className="flex items-center gap-3">
          {!isOpen && (
            <button
              className="md:block hidden mr-0 transition-transform duration-200 hover:scale-110"
              onClick={() => setIsOpen(true)}
            >
              <PanelRightCloseIcon className="w-7 h-7 dark:text-white text-zinc-900" />
            </button>
          )}
          <div className="md:flex hidden size-10 shrink-0 aspect-square rounded-full dark:shadow-current dark:shadow-sm shadow-none border dark:bg-violet-950 bg-violet-700 border-violet-700 justify-center items-center">
            <img src="/logo.png" className="h-[30px] w-[36px] text-white" />
          </div>
          <h1 className="md:block hidden text-xl font-semibold dark:text-white text-zinc-900">
            Solanisation
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <WalletConnection />
        <ThemeToggleButton />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: { width: "2.25rem", height: "2.25rem" } },
          }}
        />
      </div>
    </div>
  );
};

export default ChatNav;
