import React, { MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-scroll"; // Assuming you are still using react-scroll for internal page navigation

interface StickyMenuProps {
  navRef: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  onMouseMove: (e: ReactMouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  menuItems: {
    key: string;
    to: string;
    label: string;
  }[];
  scrollbarHide?: boolean; // Optional prop to hide scrollbar, defaults to true
}

const StickyMenu: React.FC<StickyMenuProps> = ({
  navRef,
  style,
  onMouseMove,
  onMouseLeave,
  menuItems,
  scrollbarHide = true, // Default value is true to hide scrollbar if not specified
}) => {
  const scrollbarClass = scrollbarHide ? "scrollbar-hide" : "";

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-20 bg-white border-b mb-8 -mx-8 px-8 font-work-sans-bold"
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={`flex overflow-x-auto space-x-4 py-2 ${scrollbarClass}`}>
        {menuItems.map((item) => (
          <div key={item.key} className="flex flex-col">
            <Link
              to={item.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="px-4 py-2 whitespace-nowrap hover:bg-gray-100 rounded"
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default StickyMenu;
