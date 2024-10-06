import { ROUTES } from "@/routes";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import addIcon from "@/assets/images/admin_assets/add_icon.png";
import listItemBox from "@/assets/images/admin_assets/order_icon.png";
import { Navigate, Outlet, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    navigate(ROUTES.adminAddProduct);
  }, []);

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
