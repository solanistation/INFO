"use client";
import React, { useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconCloud } from "./IconCloud";
import { ConfettiButton } from "./Confetti";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "./Navbar";
import Link from "next/link";
import { AnimatedListComponent } from "./AnimatedListComponent";
import Footer from "./Footer";

const slugs = [
  // Blockchain & Crypto
  "solana",
  "ethereum",
  "bitcoin",
  "rust",
  "walletconnect",
  "blockchaindotcom",
  "tether",
  "bnbchain",
  "web3dotjs",
  "ethers",
  "dogecoin",
  "litecoin",
  "solidity",
  "polygon",
  "near",
  "stellar",
  "polkadot",
  "xrp",
  "sui",

  // Development Tools & Frameworks
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "nodejs",
  "npm",
  "git",
  "github",
  "gitlab",
  "vscode",
  "stackexchange",
  "stackoverflow",

  // APIs & Integration
  "redis",
  "upstash",
  "mongodb",

  // Web3 & DeFi
  "web3",
  "opensea",
  "uniswap",
  "chainlink",
  "coinbase",
  "binance",
  "coinmarketcap",
];

export function LandingPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <div className="lg:-mb-40 -mb-20 flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="mb-5 md:text-4xl text-xl md:font-semibold text-black dark:text-white">
                Welcome to the future of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Solana Development
                </span>
              </h1>
            </>
          }
        >
          {/* <video
            src=""
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            autoPlay
            loop
            muted
          /> */}
          <Image
            src="/main-laptop.png"
            alt="main"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-center h-full sm:block md:hidden lg:block hidden"
            draggable={false}
          />
          <Image
            src="/main-tablet.png"
            alt="main"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-center h-full md:block hidden lg:hidden"
            draggable={false}
          />
          <Image
            src="/main-mobile.png"
            alt="main"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-center h-full sm:hidden block"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      <div className="my-10 w-[80%] mx-auto flex lg:flex-row flex-col justify-between items-center">
        <div className="my-auto max-w-full lg:max-w-[50%]">
          <div className="md:text-4xl text-3xl font-bold mb-3">
            Master Solana Development with Solanisation
          </div>
          <p>
            Dive into the most comprehensive Solana knowledge base. Solanisation
            offers you answers on Solana development, smart contracts, and more.
            Learn anything and everything Solana with Solanisation.
          </p>
          <Link href="/sign-in">
            <button className="my-3 dark:shadow-current dark:shadow-sm shadow-none px-4 py-1.5 rounded-[8px] border dark:bg-violet-950 bg-violet-700 border-violet-700 text-white">
              Sign In
            </button>
          </Link>
        </div>
        <div className="-z-1 relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-transparent md:px-10 px-0 md:pt-8 pt-0 pb-20">
          <IconCloud iconSlugs={slugs} />
        </div>
        
      </div>

      <div className="pb-10 h-full border-t border-b dark:bg-violet-950 bg-violet-700 border-violet-700">
        <div className="w-[80%] mx-auto flex lg:flex-row flex-col justify-between items-center">
          <div>
            <Image src="/soldev.png" height={400} width={400} alt="solanadevs" />
          </div>
          <div className="text-center lg:text-left flex flex-col justify-center text-white max-w-full lg:max-w-[50%]">
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">
              Join Solanisation -{" "}
              <span className="font-medium">
                Your Gateway to Solana Development
              </span>
            </h1>
            <p>
              Embark on a journey of discovery with Solanisation, where Solana
              developers find solutions, learn faster, and build better. Join us
              today and unlock the full potential of Solana development.
            </p>
          </div>
        </div>
      </div>
      <div className="my-20 w-[80%] mx-auto flex lg:flex-row flex-col justify-between items-center">
        <div className="my-auto max-w-full lg:max-w-[50%]">
          <div className="md:text-4xl text-3xl font-bold mb-3">
            Learn Solana Faster, Smarter, and Easier!
          </div>
          <p>
            Solanisation is your go-to resource for all things Solana. With
            Solanisation, accessing and understanding Solana concepts is a
            breeze. Leverage our extensive knowledge base to enhance your Solana
            development skills.
          </p>
          <div className="relative">
            <ConfettiButton>Explore Solanisation 🎉</ConfettiButton>
          </div>
        </div>
        <Image
          src="/solana.png"
          className="lg:mt-0 mt-3"
          width={600}
          height={600}
          alt="solana"
        />
      </div>
      <div className="my-10 w-[80%] mx-auto flex lg:flex-row flex-col justify-between items-center">
        <div className="my-auto max-w-full lg:max-w-[50%]">
          <div className="md:text-4xl text-3xl font-bold mb-3">
            Solanisation - Data Scraping & Vectorization
          </div>
          <p>
            Solanisation offers you insights sourced from Solana Docs, Solana
            Stack Exchange, Solana Cookbook, and more. We've vectorized this
            data into our database, providing you with rapid, precise answers
            for your development needs.
          </p>
          <Link href="/sign-in">
            <button className="my-3 dark:shadow-current dark:shadow-sm shadow-none px-4 py-1.5 rounded-[8px] border dark:bg-violet-950 bg-violet-700 border-violet-700 text-white">
              Sign In
            </button>
          </Link>
        </div>
        <AnimatedListComponent />
      </div>
      <Footer />
    </>
  );
}
