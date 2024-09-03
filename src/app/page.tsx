import { BackgroundBeams } from "@/components/ui/background-beams";


export default function Home() {
  return (
    <>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="flex text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-silver to-copper h-64 w-full py-8 justify-center">
          SOB
        </p>
      </div>
    </>
  );
}
