import Image from "next/image";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 sm:px-6">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="App Logo"
            width={104}
            height={32}
            className="h-8 w-[104px] cursor-pointer"
          />
        </Link>
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-10 text-center">
        <Link
          href="https://github.com/i-mkarmakar/Papr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center gap-2">
            <Badge
              variant="neutral"
              className="group relative flex items-center gap-1 overflow-hidden"
            >
              <Image
                src="/star.png"
                alt="Star us on GitHub"
                width={14}
                height={14}
                className="block group-hover:hidden"
              />
              <Image
                src="/yellow_star.png"
                alt="Star us on GitHub"
                width={14}
                height={14}
                className="hidden group-hover:block"
              />
              Star us on GitHub
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Badge>
          </div>
        </Link>
        <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Remember Everything, Focus on What Matters.
        </h1>
        <p className="mt-4 text-base sm:text-lg">
          Easily build organizations, organize tasks into groups, and schedule
          reminders in a sleek, clutter-free workspace.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link href="/home">
            <Button
              size="lg"
              className="group relative cursor-pointer overflow-hidden text-base"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </main>

      <footer
        className={cn("group animate-in fade-in-25 w-full px-6 py-4 text-xs")}
      >
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 md:flex-row">
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            <Heart className="h-4 w-4 text-red-500 group-hover:transform group-hover:animate-pulse" />
            <p className="flex items-center gap-1">Made by Manish using</p>
            <Link
              href="https://create.t3.gg"
              target="_blank"
              className="flex items-center gap-1"
            >
              <Image
                src="/t3_logo.png"
                alt="T3 Logo"
                width={12}
                height={12}
                className="inline-block"
              />
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex cursor-pointer items-center gap-2">
            <Image src="/x_logo.png" alt="X Logo" width={12} height={12} />
            <Link
              href="https://x.com/i_mkarmakar"
              target="_blank"
              className="flex items-center gap-1"
            >
              <span>Twitter (X)</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;