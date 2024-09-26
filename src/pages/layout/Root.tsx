import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    subItems: [
      { label: "Overview", path: "/dashboard/overview" },
      { label: "Stats", path: "/dashboard/stats" },
    ],
  },
  {
    label: "Settings",
    path: "/settings",
    subItems: [
      { label: "Profile", path: "/settings/profile" },
      { label: "Account", path: "/settings/account" },
    ],
  },
  // Add more items as needed
];

export default function Root() {
  return (
    <div id="app">
      <Outlet />
    </div>
  );
}
