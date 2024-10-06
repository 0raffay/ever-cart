import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ProductCardList from "@/components/ProductCardList";
import {
  useAddToCartMutation,
  useGetSingleProductDetailsQuery,
  useGetUserProductListQuery,
} from "@/app/services/product/productApiSlice";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Skeleton from "@/components/Skeleton";
import { baseUrl } from "@/constant/index";
import { useDispatch } from "react-redux";
import { setAddCartQuantity } from "@/app/features/product/productSlice";

const buttonData = ["S", "M", "L", "XL", "XXL"];

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { toast } = useToast();

  const {
    isLoading: relatedProductLoading,
    data: RelatedProductData,
    isSuccess: relatedProductSuccess,
    error: relatedProductError,
  } = useGetUserProductListQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const {
    isLoading: productDetLoading,
    data: productDetData,
    isSuccess: productDetSuccess,
    error: productDetError,
  } = useGetSingleProductDetailsQuery(productId, {
    refetchOnMountOrArgChange: true,
  });

  const [
    addToCart,
    {
      isLoading: addCartLoading,
      isSuccess: addCartSuccess,
      error: addCartError,
    },
  ] = useAddToCartMutation();

  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = async () => {
    if (!quantity && quantity === 0) {
      toast({
        title: "Please Add Quantity",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }

    if (quantity > productDetData?.data?.quantity) {
      toast({
        title: `We have limited stock for this product only ${productDetData?.data?.quantity} remaining!!`,
        variant: "destructive",
        duration: 1000,
      });

      return;
    }

    await addToCart({
      user_id: 4,
      product_id: productId,
      quantity: Number(quantity),
    });
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  scrollToTop();

  useEffect(() => {
    if (addCartSuccess) {
      toast({
        title: "Added To Cart Successfully!!",
        variant: "success",
        duration: 1000,
      });
      dispatch(setAddCartQuantity(quantity));
      setQuantity(0);
    }

    if (addCartError) {
      toast({
        title: "Error",
        description: "Try adding again!!",
        variant: "destructive",
        duration: 1000,
      });
    }
  }, [addCartSuccess, addCartError]);

  return (
    <main id="productDetail">
      <section className="proudctDetailSection">
        {productDetLoading ? (
          <Skeleton className="h-[638px] w-full rounded-md" />
        ) : (
          <div className="productDetailsWrapper flex items-start py-2 justify-center gap-10 lg:flex-nowrap flex-wrap">
            <div className="productImgWrapper flex items-start flex-grow max-w-[450px] w-full gap-3 flex-col">
              <div className="img_wrap flex-grow">
                <img
                  src={baseUrl + productDetData?.data?.images?.[0]}
                  alt="Reload Page"
                  className="w-[450px] h-full object-cover rounded-sm"
                />
              </div>
              <div className="productSubImages flex items-center gap-2 flex-grow w-full">
                {productDetData?.data?.images?.map(
                  (item: string[], index: number) => {
                    return (
                      <div className="img_wrap h-[90px] w-[50px] flex-grow">
                        <img
                          src={baseUrl + item}
                          key={index}
                          alt="Reload Page"
                          className="rounded-sm object-cover h-full w-full flex-grow"
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="content_wrap max-w-[600px] w-full">
              <h5 className="lg:text-[28px] text-black font-bold md:text-[16px] capitalize mb-3">
                {productDetData?.data?.name}
              </h5>
              <span className="lg:text-[25px] md:text-[20px] text-[18px] font-bold text-black mb-3">
                ${productDetData?.data?.price}
              </span>
              <p className="text-gray-600 text-[14px] font-medium mb-2">
                {productDetData?.data?.description}
              </p>
              <p className="text-yellow-500 text-[14px] mb-2">
                We have limited Stock for this product only{" "}
                {productDetData?.data?.quantity} is remaining!!
              </p>
              <div className="mb-4">
                <span className="text-black text-[14px] font-medium mb-4">
                  Select Quantity
                </span>
                <div className="input_wrapn max-w-[500px] w-full">
                  <Input
                    placeholder="Quantity"
                    variant="tertiary"
                    size="md"
                    type="number"
                    className="lg:w-[50%] w-full"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="button_wrap">
                <span className="text-black text-[14px] font-medium mb-4">
                  Select Size
                </span>
                <div className="flex items-center justify-start gap-3 mb-6">
                  {buttonData.map((item, index) => {
                    return (
                      <Button
                        size="icon"
                        variant="icon"
                        className="bg-[#F2F4F5] hover:opacity-15 duration-150 transition-all"
                        onClick={() => console.log("index", index)}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div className="button_wrap mb-6">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAddToCart}
                  isLoading={addCartLoading}
                >
                  ADD TO CART
                </Button>
              </div>
              <div className="pt-4 border-t border-solid border-gray-500">
                <ul>
                  <li className="text-gray-400 text-[14px] font-medium mb-2">
                    100% original product.
                  </li>
                  <li className="text-gray-400 text-[14px] font-medium mb-2">
                    Cash on delivery is available on this product.
                  </li>
                  <li className="text-gray-400 text-[14px] font-medium mb-2">
                    Easy return and exchange policy with 7 days
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      <ProductCardList
        heading="Related Products"
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, commodi voluptatum ipsum repellendus fuga quod suscipit molestias cum consequatur nemo."
        loading={relatedProductLoading}
        products={RelatedProductData?.data}
        success={relatedProductSuccess}
        error={relatedProductError}
      />
    </main>
  );
};

export default ProductDetails;
