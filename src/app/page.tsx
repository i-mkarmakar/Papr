import Image from "next/image";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronRight, Github, Star } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
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

      <div className="relative z-10 max-w-2xl text-center">
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
        <p className="text-muted-foreground mt-4 text-[17px] md:text-lg">
          Create organizations, group tasks into collections, and set reminders
          with ease — all inside a clean, distraction-free interface.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/app">
            <Button size="lg" className="cursor-pointer text-base">
              Get Started <ChevronRight className="ml-2 h-4 w-4" />
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
              <Github className="mr-2 h-4 w-4" />
              GitHub Repo <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
