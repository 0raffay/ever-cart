import { selectShowLoader } from "@/app/features/ui/uiSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

const Loader = () => {
  const showLoader = useSelector(selectShowLoader);

  return (
    showLoader && (
      <div className="bg-black bg-opacity-40 fixed inset-0 flex items-center justify-center">
        <div className="loader">
          <AiOutlineLoading3Quarters className="text-[50px]" />
        </div>
      </div>
    )
  );
};

export default Loader;
