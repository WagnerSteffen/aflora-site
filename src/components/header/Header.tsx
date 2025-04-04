import { useState } from "react"; // Importe useState
import { Link } from "react-router-dom";
import logoHeader from "../../assets/aflora_symbol.png";
import { usePageMenu } from "../../hooks/usePageMenu.ts"; // Importe o hook para acessar o contexto

const Header = () => {
  const { pageMenuItems } = usePageMenu(); // Consuma o contexto para obter os itens de menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar o dropdown

  return (
    <header className="sticky top-0 bg-white border-b z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logoHeader}
              alt="Logo da Empresa"
              className="h-10 w-auto mr-4"
            />
          </Link>
        </div>

        {/* Navegação Principal e Dropdown */}
        <nav className="flex items-center space-x-4">
          {/* Links Principais */}
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

          {/* Dropdown Condicional para Itens da Página */}
          {pageMenuItems && pageMenuItems.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-md font-work-sans-bold flex items-center" // Adicione estilo de botão se necessário
              >
                Categorias {/* Ou um título mais genérico */}
                {/* Ícone de seta (opcional) */}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Conteúdo do Dropdown */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40" // Estilização básica do dropdown
                  onMouseLeave={() => setIsDropdownOpen(false)} // Fechar ao tirar o mouse (opcional)
                >
                  {pageMenuItems.map((item) => {
                    console.log("item.to:", item.to);

                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          const section = document.getElementById(item.to);
                          if (section) {
                            section.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {" "}
                        {item.label}
                      </button>
                    );
                  })}{" "}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
