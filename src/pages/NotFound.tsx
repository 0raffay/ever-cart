import { ROUTES } from "@/routes";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center isolate relative overflow-hidden">
      <div className="max-w-[560px] w-full px-4 text-center">
        <h5 className="lg:text-[50px] text-[30px] font-bold text-black uppercase mb-1">
          404 NOT FOUND
        </h5>
        <Link
          to={ROUTES.base}
          className="text-gray-400 text-[16px] font-[400] hover:text-black duration-100 transition-all"
        >
          Go back to home page
        </Link>

        <div className="notFoundPropTop h-[300px] w-[300px] rounded-full bg-black absolute top-[-50px] right-[-110px] hidden lg:block"></div>

        <div className="notFoundPropBottom h-[300px] w-[300px] rounded-full bg-black absolute bottom-[-50px] left-[-110px] hidden lg:block"></div>
      </div>
    </div>
  );
};

export default NotFound;
