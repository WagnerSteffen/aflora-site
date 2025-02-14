import { Link } from "react-router-dom"; // Importe Link do react-router-dom
import logoHeader from "../../assets/aflora_symbol.png"; // Importe a logo

const Header = () => {
  return (
    <header className="sticky top-0 bg-white border-b z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo à esquerda */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logoHeader}
              alt="Logo da Empresa"
              className="h-10 w-auto mr-4"
            />
          </Link>
        </div>

        {/* Botões de navegação à direita */}
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-md font-work-sans-bold"
          >
            Home
          </Link>
          <Link
            to="/sobre"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-md font-work-sans-bold"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
