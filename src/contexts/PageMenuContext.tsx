import React, { createContext, useState, ReactNode } from "react";

export interface PageMenuItem {
  key: string;
  to: string;
  label: string;
}

export interface IPageMenuContextValue {
  pageMenuItems: PageMenuItem[] | null;
  setPageMenuItems: (items: PageMenuItem[] | null) => void;
}

export const PageMenuContext = createContext<IPageMenuContextValue | null>(
  null,
);

interface PageMenuProviderProps {
  children: ReactNode;
}

export const PageMenuProvider: React.FC<PageMenuProviderProps> = ({
  children,
}) => {
  const [pageMenuItems, setPageMenuItems] = useState<PageMenuItem[] | null>(
    null,
  );

  return (
    <PageMenuContext.Provider value={{ pageMenuItems, setPageMenuItems }}>
      {children}
    </PageMenuContext.Provider>
  );
};
