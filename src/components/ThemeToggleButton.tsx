import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full relative ${
        resolvedTheme === "dark"
          ? "bg-zinc-900 hover:bg-zinc-800"
          : "bg-zinc-900 hover:bg-zinc-800"
      } border-zinc-700`}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <div className="relative h-[1.3rem] w-[1.2rem]">
        <Sun
          className={`absolute transition-transform duration-500 ease-in-out ${
            resolvedTheme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          } text-white mt-[2px] ml-[2px]`}
        />
        <Moon
          className={`absolute transition-transform duration-500 ease-in-out ${
            resolvedTheme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          } text-white mt-[2px] ml-[2px]`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
