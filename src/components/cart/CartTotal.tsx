import { Link } from "react-router-dom";
import Heading from "../Heading";
import { ROUTES } from "@/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalUserBill,
  setCartTotal,
} from "@/app/features/product/productSlice";

interface CartTotal {
  showButton: boolean | null;
}

const CartTotal = ({ showButton, productData }: CartTotal) => {
  const dispatch = useDispatch();

  console.log("product data", productData);

  const totalBill: number = useSelector(selectTotalUserBill);

  useEffect(() => {
    if (productData) {
      dispatch(setCartTotal(productData));
    }
  }, [productData]);

  return (
    <div className="cartTotal max-w-[600px] w-full ml-auto">
      <div className="mb-2 w-max mr-auto">
        <Heading headingText="Cart Totals" />
      </div>
      <ul className="lg:mb-5 mb-4">
        <li className="border-b border-solid border-gray-400 pb-2 mb-2 flex items-center justify-between">
          <h5 className="text-black font-[500] text-[14px]">Sub Total</h5>
          <span className="text-black font-[500] text-[14px]">
            ${totalBill}
          </span>
        </li>
        <li className="border-b border-solid border-gray-400 pb-2 mb-2 flex items-center justify-between">
          <h5 className="text-black font-[500] text-[14px]">Shipping Fee</h5>
          <span className="text-black font-[500] text-[14px]">
            {productData?.length && productData ? "$20" : "$0"}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <h5 className="text-black font-[500] text-[14px]">Total</h5>
          <span className="text-black font-[500] text-[14px]">
            ${productData && productData?.length ? totalBill + 20 : totalBill}
          </span>
        </li>
      </ul>
      {showButton && (
        <div className="button_wrap ml-auto w-max">
          <Link
            to={ROUTES.placeOrder}
            className="px-3 py-2 bg-black text-white font-medium uppercase hover:bg-white hover:text-black hover:border duration-200 transition-all"
          >
            proceed to checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartTotal;
