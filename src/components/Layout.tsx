import React from "react";
import Header from "./header/Header";
import { PageMenuProvider } from "../contexts/PageMenuContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <PageMenuProvider>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </PageMenuProvider>
  );
};

export default Layout;
