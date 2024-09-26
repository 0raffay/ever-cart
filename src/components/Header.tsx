import { ROUTES } from "@/routes";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/images/frontend_assets/logo.png";
import { Button } from "./ui/button";
import searchIcon from "@/assets/images/frontend_assets/search_icon.png";
import personIcon from "@/assets/images/frontend_assets/profile_icon.png";
import cartIcon from "@/assets/images/frontend_assets/cart_icon.png";

import { LuMenu } from "react-icons/lu";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="py-4 border-b border-solid border-[#9999994f]">
      <div className="headerContainer md:flex items-center justify-between hidden">
        <div className="logo">
          <Link to={ROUTES.base}>
            <img src={logo} alt="Reload Page" className="w-[200px]" />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-x-[40px]">
            <li>
              <NavLink
                to={ROUTES.base}
                className={({ isActive }) =>
                  isActive
                    ? "relative text-[#111] text-[15px] font-bold uppercase active"
                    : "relative text-[#111] text-[15px] font-bold uppercase"
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  isActive
                    ? "relative text-[#111] text-[15px] font-bold uppercase active"
                    : "relative text-[#111] text-[15px] font-bold uppercase"
                }
              >
                COLLECTION
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.about}
                className={({ isActive }) =>
                  isActive
                    ? "relative text-[#111] text-[15px] font-bold uppercase active"
                    : "relative text-[#111] text-[15px] font-bold uppercase"
                }
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.contact}
                className={({ isActive }) =>
                  isActive
                    ? "relative text-[#111] text-[15px] font-bold uppercase active"
                    : "relative text-[#111] text-[15px] font-bold uppercase"
                }
              >
                CONTACT
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header_icons flex items-center justify-center gap-x-[30px]">
          <Button className="h-6 w-6" variant="icon" size="icon">
            <img src={searchIcon} alt="Reload Page" className="h-full" />
          </Button>
          <Link to={ROUTES.register} className="h-6 w-6">
            <img src={personIcon} alt="Reload Page" className="h-full" />
          </Link>
          <Button className="h-6 w-6" variant="icon" size="icon">
            <img src={cartIcon} alt="Reload Page" className="h-full" />
          </Button>
        </div>
      </div>

      <div className="mobileWrapper md:hidden block">
        <div className="mobileContainer flex items-center justify-between">
          <div className="logo">
            <Link to={ROUTES.base}>
              <img src={logo} alt="Reload Page" className="w-[150px]" />
            </Link>
          </div>
          <Button
            variant="icon"
            size="icon"
            onClick={() => setShowMenu(!showMenu)}
          >
            <LuMenu className="text-[30px]" />
          </Button>
        </div>
        <div
          className={`mobileMenu shadow-md bg-white w-[70%] py-10 fixed top-0 left-0 bottom-0 transition-all duration-300 ease-linear ${
            !showMenu ? "translate-x-[-100%]" : "translate-x-[0%]"
          }`}
        >
          <div className="logo mb-[30px] px-3">
            <Link to={ROUTES.base}>
              <img src={logo} alt="Reload Page" className="w-[150px]" />
            </Link>
          </div>
          <nav>
            <ul>
              <li className="border border-b border-solid border-t-0 px-2 py-3">
                <NavLink
                  to={ROUTES.base}
                  className={({ isActive }) =>
                    isActive
                      ? "relative text-[#111] text-[15px] font-bold uppercase active py-2 mb-2"
                      : "relative text-[#111] text-[15px] font-bold uppercase"
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li className="border border-b border-solid border-t-0 px-2 py-3">
                <NavLink
                  to="/collection"
                  className={({ isActive }) =>
                    isActive
                      ? "relative text-[#111] text-[15px] font-bold uppercase active py-2 mb-2"
                      : "relative text-[#111] text-[15px] font-bold uppercase"
                  }
                >
                  COLLECTION
                </NavLink>
              </li>
              <li className="border border-b border-solid border-t-0 px-2 py-3">
                <NavLink
                  to={ROUTES.about}
                  className={({ isActive }) =>
                    isActive
                      ? "relative text-[#111] text-[15px] font-bold uppercase active py-2 mb-2"
                      : "relative text-[#111] text-[15px] font-bold uppercase"
                  }
                >
                  ABOUT
                </NavLink>
              </li>
              <li className="border border-b border-solid border-t-0 px-2 py-3">
                <NavLink
                  to={ROUTES.contact}
                  className={({ isActive }) =>
                    isActive
                      ? "relative text-[#111] text-[15px] font-bold uppercase active py-2 mb-2"
                      : "relative text-[#111] text-[15px] font-bold uppercase"
                  }
                >
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
