import { ROUTES } from "@/routes";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center isolate">
      <div className="max-w-[560px] w-full px-4 text-center">
        <h5 className="text-[40px] font-bold text-black uppercase mb-1">
          404 NOT FOUND
        </h5>
        <Link to={ROUTES.base} className="text-gray-400 text-[16px] font-[400] hover:text-black duration-100 transition-all">
          Go back to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
