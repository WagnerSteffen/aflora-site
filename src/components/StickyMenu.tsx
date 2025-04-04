import React, {
  MouseEvent as ReactMouseEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setIsScrollable(
          scrollContainerRef.current.scrollWidth >
            scrollContainerRef.current.clientWidth,
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-20 bg-white border-b mb-8 -mx-8 px-8 font-work-sans-bold"
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        {isScrollable && (
          <FaChevronLeft className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-gray-500" />
        )}
        <div
          ref={scrollContainerRef}
          className={`flex overflow-x-auto space-x-4 py-2 ${scrollbarClass}`}
        >
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
        {isScrollable && (
          <FaChevronRight className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-gray-500" />
        )}
      </div>
      {isScrollable && (
        <FaChevronRight className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-gray-500" />
      )}
    </nav>
  );
};

export default StickyMenu;
