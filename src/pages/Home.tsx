import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"; // Shadcn Button
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover"; // Shadcn Popover

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Navigation Bar for small screens */}
      <div className="block sm:hidden fixed top-0 left-0 w-full bg-white z-20">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="m-6">☰ Menu</Button>
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
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16 sm:pt-0">
        {/* Heading */}
        <div className="relative">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
            Coming soon...
          </h1>
        </div>

        {/* Standard Navigation for larger screens */}
        <div className="hidden sm:mt-10 sm:flex gap-4">
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
