import { useContext } from "react";
import {
  PageMenuContext,
  IPageMenuContextValue,
} from "../contexts/PageMenuContext"; // Ajuste o caminho se necessário

export const usePageMenu = (): IPageMenuContextValue => {
  const context = useContext(PageMenuContext);

  if (!context) {
    throw new Error("usePageMenu deve ser usado dentro de um PageMenuProvider");
  }

  return context;
};
