import { LandingPage } from "@/components/landing/LandingPage";
import { auth } from "@clerk/nextjs/server";
import { Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect("/chat");

  return (
    <LandingPage />
    // <main className="dark:bg-zinc-900 bg-white flex h-screen flex-col items-center justify-center gap-5">
    //   <div className="flex items-center gap-4">
    //     <div className="h-[56px] w-[56px] sm:h-[72px] sm:w-[72px] shrink-0 aspect-square rounded-full dark:shadow-current dark:shadow-sm shadow-none border dark:bg-violet-950 bg-violet-700 border-violet-700 flex justify-center items-center">
    //       <Bot className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
    //     </div>
    //     <span className="text-4xl font-extrabold tracking-tight sm:text-5xl mt-2">
    //       Solanisation
    //     </span>
    //   </div>
    //   <p className="max-w-prose text-center px-8">
    //     Welcome to Solanisation, an advanced chatbot that can help you with
    //     anything Solana. Click the button below to start chatting.
    //   </p>
    //   <Link href="/sign-in">
    //     <button className="dark:shadow-current dark:shadow-sm shadow-none px-4 py-2 rounded-[10px] border dark:bg-violet-950 bg-violet-700 border-violet-700 text-white">
    //       Login
    //     </button>
    //   </Link>
    // </main>
  );
}
