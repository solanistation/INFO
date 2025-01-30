import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, ExternalLink, Copy, Check, Loader2 } from "lucide-react";
import { useGlobalContext } from "@/contexts/GlobalContextProvider";

const WalletConnection = () => {
  const { setGlobalWalletAddress } = useGlobalContext();
  const { connection } = useConnection();
  const {
    publicKey,
    connected,
    connecting,
    connect,
    disconnect,
    select,
    wallet,
    wallets,
  } = useWallet();

  const [balance, setBalance] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setGlobalWalletAddress(publicKey?.toString() || "");
  }, [publicKey, setGlobalWalletAddress]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
        } catch (err) {
          console.error("Error fetching balance:", err);
          setBalance(null);
        }
      }
    };

    if (connected) {
      fetchBalance();
      const intervalId = setInterval(fetchBalance, 10000);
      return () => clearInterval(intervalId);
    }
  }, [connected, publicKey, connection]);

  const handleConnectWallet = async (walletName: string) => {
    try {
      setIsLoading(true);
      const selectedWallet = wallets.find((w) => w.adapter.name === walletName);
      if (selectedWallet) {
        await select(selectedWallet.adapter.name);
        await connect();
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getWalletIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "phantom":
        return "👻";
      case "solflare":
        return "🌞";
      case "backpack":
        return "🎒";
      default:
        return "👝";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-10 shrink-0 aspect-square rounded-full dark:shadow-current dark:shadow-sm shadow-none border dark:bg-violet-950 bg-violet-700 border-violet-700 flex justify-center items-center">
          <Wallet className="transition-transform duration-200 hover:scale-110 size-5 text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 mt-2 mr-2 z-40 dark:bg-zinc-900 bg-white border border-gray-300 rounded-xl">
        {!connected ? (
          <div className="border-0 shadow-none p-4">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Connect Wallet</h3>
              <p className="text-sm text-gray-500">
                Select your preferred Solana wallet
              </p>
            </div>
            <div className="space-y-2">
              {wallets.map((walletAdapter) => (
                <button
                  key={walletAdapter.adapter.name}
                  className="w-full flex items-center justify-start gap-2 h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-white dark:bg-zinc-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
                  onClick={() =>
                    handleConnectWallet(walletAdapter.adapter.name)
                  }
                  disabled={connecting || isLoading}
                >
                  <span className="text-lg">
                    {getWalletIcon(walletAdapter.adapter.name)}
                  </span>
                  {walletAdapter.adapter.name}
                  {(connecting || isLoading) &&
                    wallet?.adapter.name === walletAdapter.adapter.name && (
                      <Loader2 className="ml-auto h-4 w-4 animate-spin" />
                    )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-0 shadow-none p-4">
            <div className="pb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span>{getWalletIcon(wallet?.adapter.name || "")}</span>
                {wallet?.adapter.name}
              </h3>
              <button
                className="h-8 px-3 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-950 rounded-md transition"
                onClick={disconnect}
              >
                Disconnect
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Address</span>
                  <div className="flex items-center gap-2">
                    <button className="h-8 p-1" onClick={copyAddress}>
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      className="h-8 p-1"
                      onClick={() =>
                        window.open(
                          `https://solscan.io/account/${publicKey?.toString()}`,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-zinc-700 rounded-md text-sm text-gray-800 dark:text-gray-200">
                  {publicKey && truncateAddress(publicKey.toString())}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Balance</span>
                  <span className="font-medium">
                    {balance !== null
                      ? `${balance.toFixed(4)} SOL`
                      : "Loading..."}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Network</span>
                  <span className="font-medium">
                    {connection.rpcEndpoint.includes("devnet")
                      ? "Devnet"
                      : "Mainnet"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnection;
