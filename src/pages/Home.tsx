import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"; // Shadcn Button
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover"; // Shadcn Popover

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black">
      {/* Heading */}
      <div className="relative">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-amatic-sc relative z-10 text-center">
          Coming soon...
        </h1>
      </div>

      {/* Navigation */}
      <div className="mt-10">
        {/* Burger Menu for small screens */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="block sm:hidden">☰ Menu</Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-4">
            <div className="flex flex-col gap-2">
              <Link to="/nossosprojetos">
                <Button variant="ghost" className="w-full text-left">
                  Nossos projetos
                </Button>
              </Link>
              <Link to="/sobre">
                <Button variant="ghost" className="w-full text-left">
                  Conheça o Aflora
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* Standard Navigation for larger screens */}
        <div className="hidden sm:flex gap-4">
          <Link to="/nossosprojetos">
            <Button variant="default">Nossos projetos</Button>
          </Link>
          <Link to="/sobre">
            <Button variant="default">Conheça o Aflora</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
