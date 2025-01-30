"use client";

import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessagesProps {
  messages: TMessage[];
  setModel?: (model: "standard" | "advanced") => void;
  isOpen: boolean;
}

export const Messages = ({ messages, setModel, isOpen }: MessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={`flex flex-col items-center flex-1 min-h-0 ${
        messages.length
          ? "justify-start overflow-y-auto pt-14 pb-40"
          : "justify-center overflow-y-hidden pt-0 pb-20"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isOpen ? "md:ml-[260px]" : ""
        }`}
      >
        <div className="lg:w-[750px] w-full mx-auto">
          {messages.length ? (
            <>
              {messages.map((message, i) => (
                <Message
                  key={i}
                  content={message.content}
                  isUserMessage={message.role === "user"}
                />
              ))}
              <div ref={bottomRef} />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              {/* <div className="h-[56px] w-[56px] sm:h-[72px] sm:w-[72px] shrink-0 aspect-square rounded-full dark:shadow-current dark:shadow-sm shadow-none border dark:bg-violet-950 bg-violet-700 border-violet-700 flex justify-center items-center">
                <Bot className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </div> */}
              <div className="h-[56px] w-[56px] sm:h-[72px] sm:w-[72px] shrink-0 aspect-square rounded-full dark:shadow-current dark:shadow-sm shadow-none border dark:bg-violet-950 bg-violet-700 border-violet-700 flex justify-center items-center">
                <img
                  src="/logo.png"
                  className="h-12 w-16 sm:h-16 sm:w-24 text-white"
                />
              </div>
              <h3 className="font-semibold text-xl text-center">
                Welcome to Solanisation for Solana Devs
              </h3>
              <p className="text-zinc-500 text-sm text-center">
                Ask me anything about Solana and I will provide you with the
                best answer.
              </p>
              <div className="flex items-center justify-center gap-6 mt-0 w-full">
                {/* Standard Model Card */}
                <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white dark:bg-zinc-900">
                  <h4 className="text-center text-sm sm:text-md md:text-lg font-bold text-gray-700 dark:text-white">
                    Standard Model
                  </h4>
                  <p className="text-center sm:block hidden text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Fast, short and efficient answers for your Solana
                    development queries.
                  </p>
                  <button
                    onClick={() => setModel && setModel("standard")}
                    className="transition-transform duration-200 hover:scale-105 mt-4 px-4 py-2 text-sm font-medium text-white border dark:bg-violet-950 bg-violet-700 border-violet-700 rounded-[10px] dark:shadow-current dark:shadow-sm shadow-none"
                  >
                    Select
                  </button>
                </div>

                {/* Advanced Model Card */}
                <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white dark:bg-zinc-900">
                  <h4 className="text-center text-sm sm:text-md md:text-lg font-bold text-gray-700 dark:text-white">
                    Advanced Model
                  </h4>
                  <p className="text-center sm:block hidden text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Detailed and practical answers for your Solana development
                    queries.
                  </p>
                  <button
                    onClick={() => setModel && setModel("advanced")}
                    className="transition-transform duration-200 hover:scale-105 mt-4 px-4 py-2 text-sm font-medium text-white border dark:bg-violet-950 bg-violet-700 border-violet-700 rounded-[10px] dark:shadow-current dark:shadow-sm shadow-none"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
