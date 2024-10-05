import Heading from "@/components/Heading";
import productImg from "@/assets/images/frontend_assets/p_img1.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useDeleteAllCartItemsMutation,
  useDeleteProductUserCartMutation,
  useGetUserCartQuery,
} from "@/app/services/product/productApiSlice";
import Skeleton from "@/components/Skeleton";
import { baseUrl } from "@/constant/index";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { handleHideLoader, handleShowLoader } from "@/app/features/ui/uiSlice";
import { ImBin2 } from "react-icons/im";
import {
  setDeleteAllQuantity,
  setDeleteCartQuantity,
} from "@/app/features/product/productSlice";

function Cart() {
  const dispatch = useDispatch();

  const {
    isLoading: cartLoading,
    data: cartData,
    isSuccess: cartSuccess,
    error: cartError,
  } = useGetUserCartQuery(4, {
    refetchOnMountOrArgChange: true,
  });

  const [
    deleteProduct,
    {
      isLoading: cartDelLoading,
      isSuccess: cartDelSuccess,
      error: cartDelError,
    },
  ] = useDeleteProductUserCartMutation();

  const [
    deleteAllItems,
    {
      isLoading: allCartDelLoading,
      isSuccess: allCartDelSuccess,
      error: allCartDelError,
    },
  ] = useDeleteAllCartItemsMutation();

  const { toast } = useToast();

  const handleDeleteCart = async (productId, quantity) => {
    dispatch(setDeleteCartQuantity(quantity));
    await deleteProduct({
      user_id: 4,
      product_id: productId,
    });
  };

  const handleDeleteAllCart = async () => {
    await deleteAllItems({
      user_id: 4,
    });
  };

  let content;
  if (cartLoading) {
    content = Array.from({ length: 4 }).map((_, index) => {
      return <Skeleton key={index} className="h-[90px] w-full mb-5" />;
    });
  } else if (cartSuccess && cartData?.data && cartData?.data?.length) {
    content = cartData?.data?.map((item, index) => {
      return (
        <div
          className="cartOrderCard border-b border-gray-300 border-solid pb-6 mb-5 flex items-center justify-between"
          key={index}
        >
          <div className="flex items-start justify-start gap-4">
            <div className="img_wrap h-[100px] w-[100px] rounded-sm overflow-hidden">
              <img
                src={baseUrl + item?.images?.[0]}
                alt="Reload Page"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="content_wrap">
              <h5 className="text-black lg:text-[23px] md:text-[18px] text-[16px] font-medium mb-3">
                {item?.name}
              </h5>
              <span className="lg:text-[18px] text-[16px] font-medium text-black">
                ${item?.price}
              </span>
            </div>
          </div>
          <div className="input_wrap">
            <Input
              placeholder="Quantity"
              className="min-w-[100px]"
              variant="tertiary"
              size="sm"
              type="number"
              value={item?.quantity}
            />
          </div>
          <div className="button_wrap">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleDeleteCart(item?.product_id, item?.quantity)}
            >
              Delete
            </Button>
          </div>
        </div>
      );
    });
  } else if (cartError) {
    console.error(cartError);
  }

  useEffect(() => {
    if (cartDelError) {
      toast({
        title: "Error",
        description: "We are having an error!!",
        variant: "destructive",
        duration: 1000,
      });
    }

    if (cartSuccess) {
      toast({
        title: "Product Deleted Successfully!!",
        variant: "success",
        duration: 1000,
      });
    }

    if (cartDelLoading) {
      dispatch(handleShowLoader());
    } else {
      dispatch(handleHideLoader());
    }
  }, [cartDelLoading, cartError, cartSuccess]);

  useEffect(() => {
    if (allCartDelSuccess) {
      toast({
        title: "All Products Deleted Successfully!!",
        variant: "success",
        duration: 1000,
      });
      dispatch(setDeleteAllQuantity());
    }

    if (allCartDelError) {
      toast({
        title: "Error",
        description: "We are having an error!!",
        variant: "destructive",
        duration: 1000,
      });
    }

    if (allCartDelLoading) {
      dispatch(handleShowLoader());
    } else {
      dispatch(handleHideLoader());
    }
  }, [allCartDelError, allCartDelLoading, allCartDelSuccess]);

  return (
    <main id="cartPage">
      <section className="cartSection">
        <div className="flex items-center lg:justify-between justify-center flex-wrap lg:mb-10 mb-4">
          <div>
            <Heading headingText="Your Cart" />
          </div>
          {cartData?.data?.length ? (
            <div className="button_wrap">
              <Button
                variant="primary"
                size="sm"
                onClick={handleDeleteAllCart}
                className="flex items-center gap-3"
              >
                <ImBin2 />
                Delete All
              </Button>
            </div>
          ) : null}
        </div>
        <div className="cartList">{content}</div>
      </section>
    </main>
  );
}

export default Cart;
