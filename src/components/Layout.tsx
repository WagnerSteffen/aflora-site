import React from "react";
import Header from "./header/Header"; // Importe o componente Header que você criou

interface LayoutProps {
  children: React.ReactNode; // Define que Layout recebe 'children' como prop
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
