import Heading from "@/components/Heading";
import productImg from "@/assets/images/frontend_assets/p_img1.png";
import { Button } from "@/components/ui/button";
import { useGetOrdersOfUserQuery } from "@/app/services/product/productApiSlice";
import Skeleton from "@/components/Skeleton";

const Order = () => {
  const {
    isLoading: orderLoading,
    data: orderData,
    isSuccess: orderSuccess,
    error: orderError,
  } = useGetOrdersOfUserQuery(4, {
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (orderLoading) {
    content = Array.from({ length: 4 }).map((_, index) => {
      return <Skeleton key={index} className="h-[100px] w-full mb-5" />;
    });
  } else if (orderSuccess) {
    console.log("order statsus", orderData?.data);
  } else if (orderError) {
    console.error("order error", orderError);
  }

  return (
    <main id="orderPage" className="my-10">
      <section className="orderSection">
        <div className="mr-auto w-max mb-4">
          <Heading headingText="My Orders" />
        </div>
        <div className="orderCardWrapper">
          <div className="grid lg:grid-cols-3 md:grid-col-2 grid-col-1 gap-4 border-y border-solid border-gray-400 py-4 mb-4 items-center">
            <div className="orderInfo flex items-center justify-start gap-5 ">
              <div className="img_wrap h-[100px] w-[100px] rounded-md overflow-hidden">
                <img src={productImg} alt="Reload PAge" />
              </div>
              <div className="content_wrap">
                <h5 className="text-[16px] font-medium text-black mb-3 capitalize">
                  Men Round Neck t-shirt
                </h5>
                <div className="flex items-start gap-3 justify-start mb-3">
                  <span className="text-black text-[14px]">
                    <strong className="mr-1">Price:</strong>$10
                  </span>
                  <span className="text-black text-[14px]">
                    <strong className="text-black">Quantity</strong>: 20
                  </span>
                </div>
                <span className="text-black text-[14px] mb-2">
                  <strong>Date:</strong> 20
                </span>
                <span className="text-black text-[14px] mb-2 uppercase">
                  <strong className="text-black capitalize mr-1">
                    Payment:
                  </strong>
                  COD
                </span>
              </div>
            </div>
            <div className="orderStatus flex items-start gap-2 justify-center">
              <span className="h-[15px] w-[15px] bg-green-600 rounded-full"></span>
              <span className="text-black text-[15px] font-medium capitalize leading-[1]">
                Order Placed
              </span>
            </div>
            <div className="button_wrap text-end">
              <Button variant="secondary" size="sm">
                Track Orders
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Order;
