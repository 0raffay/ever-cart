import { ROUTES } from "@/routes";
import { Link } from "react-router-dom";
import logo from "@/assets/images/admin_assets/logo.png";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowSidebar,
  setShowSidebar,
} from "@/app/features/admin/adminAddProductSilce";

const AdminHeader = () => {
  const dispatch = useDispatch();

  const showSidebar = useSelector(selectShowSidebar);

  const handleShowSidebar = () => {
    dispatch(setShowSidebar());
  };

  return (
    <header>
      <div className="headerContainer py-3 bg-white shadow-sm borde border-solid border-[#99999921]">
        <div className="container max-w-[1320px] w-full mx-auto px-3">
          <div className="flex items-center justify-between">
            <Link to={ROUTES.adminAddProduct}>
              <img src={logo} alt="Reload Page" className="w-[160px]" />
            </Link>
            <div className="button_wrap md:block hidden">
              <Button
                variant="secondary"
                size="md"
                className="gap-x-2 bg-[#4D5465] rounded-[20px] text-white capitalize"
              >
                Logout
                <CiLogout className="text-[25px]" />
              </Button>
            </div>
            <div className="button_wrap md:hidden block">
              <Button
                onClick={handleShowSidebar}
                variant="icon"
                className="gap-x-2 justify-end"
              >
                <IoMenu className="text-[30px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
