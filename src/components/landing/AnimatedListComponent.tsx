"use client";

import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";

interface Resource {
  title: string;
  description: string;
  icon: string;
  color: string;
  source: string;
}

let solanaResources = [
  {
    title: "Solana Docs",
    description: "Comprehensive guides and references for Solana development.",
    source: "Docs",
    icon: "📄",
    color: "#00C9A7",
  },
  {
    title: "Solana Stack Exchange",
    description: "Frequently asked questions and answers from the community.",
    source: "FAQs",
    icon: "💬",
    color: "#FFB800",
  },
  {
    title: "Solana Cookbook",
    description: "Practical code examples and projects for building on Solana.",
    source: "Projects",
    icon: "📚",
    color: "#FF5733",
  },
  {
    title: "Latest Solana Updates",
    description: "Stay informed about the latest developments in the Solana ecosystem.",
    source: "News",
    icon: "📝",
    color: "#1E86FF",
  },
  {
    title: "Solana Smart Contracts",
    description: "Learn about developing, deploying, and managing smart contracts on Solana.",
    source: "Dev",
    icon: "🔏",
    color: "#8B5CF6",
  },
  {
    title: "Solana DeFi",
    description: "Explore decentralized finance applications and protocols on Solana.",
    source: "DeFi",
    icon: "💰",
    color: "#FF8C00",
  },
  {
    title: "Solana NFT Guide",
    description: "Learn how to create, mint, and trade NFTs on Solana.",
    source: "NFTs",
    icon: "🖼️",
    color: "#FF4500",
  },
  {
    title: "Solana Wallets",
    description: "Discover and compare different Solana wallet options.",
    source: "Wallets",
    icon: "💳",
    color: "#00BFFF",
  },
];

solanaResources = Array.from({ length: 10 }, () => solanaResources).flat();

const ResourceCard = ({ title, description, icon, color, source }: Resource) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white text-black ">
            <span className="text-sm sm:text-lg">{title}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{source}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60 text-black/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListComponent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full flex-col sm:px-6 px-0 py-6 overflow-hidden",
        className
      )}
    >
      <AnimatedList>
        {solanaResources.map((resource, idx) => (
          <ResourceCard {...resource} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
