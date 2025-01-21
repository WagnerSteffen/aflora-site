import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const Header = () => {
  return (
    <div className="block sm:hidden fixed top-0 left-0 w-full bg-white z-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="m-6">☰ Menu</Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-4">
          <div className="flex flex-col gap-2">
            <Link to="/producoes">
              <Button variant="ghost" className="w-full text-left">
                Organização de Eventos
              </Button>
            </Link>
            <Link to="/projetoseoficinas">
              <Button variant="ghost" className="w-full text-left">
                Projetos e Oficinas
              </Button>
            </Link>
            <Link to="/fotografia">
              <Button variant="ghost" className="w-full text-left">
                Fotografia
              </Button>
            </Link>
            <Link to="/performance">
              <Button variant="ghost" className="w-full text-left">
                Performance Artística
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
  );
};

export default Header;
