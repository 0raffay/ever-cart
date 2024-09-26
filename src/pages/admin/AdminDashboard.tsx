import { ROUTES } from "@/routes";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import addIcon from "@/assets/images/admin_assets/add_icon.png";
import listItemBox from "@/assets/images/admin_assets/order_icon.png";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const sidebarMenuList = [
    {
      menuItemText: "Add Items",
      route: ROUTES.adminAddProduct,
      menuItemImg: addIcon,
    },
    {
      menuItemText: "Products List",
      route: ROUTES.adminProductsList,
      menuItemImg: listItemBox,
    },
    {
      menuItemText: "All Orders",
      route: ROUTES.adminOrderList,
      menuItemImg: listItemBox,
    },
  ];

  return (
    <>
      <AdminHeader />
      <div className="flex items-stretch justify-start gap-0">
        <AdminSidebar menuList={sidebarMenuList} />
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
