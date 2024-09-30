import { ROUTES } from "@/routes";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/images/admin_assets/logo.png";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectShowSidebar } from "@/app/features/admin/adminAddProductSilce";

interface MenuItemProps {
  route: string;
  menuItemText: string;
  menuItemImg: string;
}

interface AdminSidebarProps {
  menuList: MenuItemProps[];
}

const AdminSidebar = ({ menuList }: AdminSidebarProps) => {
  const showSidebar = useSelector(selectShowSidebar);

  return (
    <aside
      className={`
        adminSidebar md:max-w-[330px] flex-1 md:w-full bg-white border-r border-t border-solid 
        border-[#99999949] shadow-sm py-4 px-3 min-h-screen md:static fixed top-0 bottom-0 
        sm:w-[50%] w-[70%] z-[30] transition-all duration-300 ease-linear 
        ${showSidebar ? "left-[0%]" : "left-[-100%]"}
      `}
    >
      <div className="logo md:hidden block mb-10">
        <Link to={ROUTES.adminDashboard}>
          <img src={logo} alt="Reload Page" className="w-[150px]" />
        </Link>
      </div>

      <ul>
        {menuList &&
          menuList.map(({ route, menuItemText, menuItemImg }, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={route}
                className={({ isActive }) =>
                  `border-solid border border-[#999] p-2 flex items-center justify-start 
                  gap-3 drop-shadow-sm hover:bg-[#37313174] hover:text-white transition 
                  duration-100 group ${
                    isActive ? "bg-[#37313174] text-white" : ""
                  }`
                }
              >
                <div className="img_wrap">
                  <img src={menuItemImg} alt={menuItemText} />
                </div>
                <span>{menuItemText}</span>
              </NavLink>
            </li>
          ))}
      </ul>

      <div className="button_wrap absolute bottom-[25px] left-[10px] md:hidden block">
        <Button
          variant="primary"
          size="sm"
          className="gap-x-2 bg-[#4D5465] rounded-[20px] text-white capitalize"
        >
          Logout
          <CiLogout className="text-[25px]" />
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
