import Image from "next/image";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronRight, Github, Star, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6">
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

      <main className="relative z-10 mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center text-center">
        <Link
          href="https://github.com/i-mkarmakar/Papr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge variant="neutral">
            <Star /> Star us on GitHub
          </Badge>
        </Link>
        <h1 className="mt-2 text-4xl leading-[1.2] font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Remember Everything, Focus on What Matters.
        </h1>
        <p className="mt-4 text-[17px] md:text-lg">
          Easily build organizations, organize tasks into groups, and schedule
          reminders in a sleek, clutter-free workspace.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/app">
            <Button size="lg" className="cursor-pointer text-base">
              Get Started <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="https://github.com/i-mkarmakar/Papr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="noShadow"
              size="lg"
              className="cursor-pointer text-base"
            >
              <Image
                src="/github_logo.png"
                alt="Github Logo"
                width={22}
                height={22}
                className="inline-block"
              />
              GitHub Repo <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>

      <footer
        className={cn(
          "group animate-in fade-in-25 w-full text-sm",
          "px-6 py-4",
        )}
      >
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 md:flex-row">
          <div className="flex flex-wrap items-center gap-2">
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
                width={16}
                height={16}
                className="inline-block"
              />
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex cursor-pointer items-center gap-2">
            <Image src="/x_logo.png" alt="X Logo" width={16} height={16} />
            <Link
              href="https://x.com/i_mkarmakar"
              target="_blank"
              className="flex items-center gap-1"
            >
              <span className="hidden md:block">Twitter (X)</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
