import CartTotal from "@/components/cart/CartTotal";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import stripeImg from "@/assets/images/frontend_assets/stripe_logo.png";
import razorPays from "@/assets/images/frontend_assets/razorpay_logo.png";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAllCartItemsMutation,
  usePlaceOrderMutation,
} from "@/app/services/product/productApiSlice";
import { useEffect } from "react";
import { toast, useToast } from "@/hooks/use-toast";
import { setDeleteAllQuantity } from "@/app/features/product/productSlice";
import { useDispatch } from "react-redux";
import { useForm } from "@/hooks/useForm";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    placeOrder,
    {
      isLoading: placeOrderLoading,
      isSuccess: placeOrderSuccess,
      error: placeOrderError,
    },
  ] = usePlaceOrderMutation();

  const [resetCart] = useDeleteAllCartItemsMutation();

  const { toast } = useToast();

  const { formFields, handleChange, handleUpdateFormFields } = useForm();

  console.log("form fields", formFields);

  const handlePlaceOrder = async () => {
    if (!Object.keys(formFields).length) {
      toast({
        title: "Please Fill the required Fields!!!",
        variant: "destructive",
        duration: 1200,
      });
      return;
    } else {
      const everyFieldIsFilled = Object.keys(formFields).every((item) => {
        const value = formFields[item];
        return value && (typeof value !== "string" || value.trim().length > 0);
      });

      if (!everyFieldIsFilled) {
        toast({
          title: "Please Fill the required Fields!!!",
          variant: "destructive",
          duration: 1200,
        });
        return;
      }
    }

    await placeOrder({
      user_id: 4,
      payment_method: "Credit Card",
      shipping_address: `${formFields["street"]} ${formFields["city"]} ${formFields["country"]}`,
      billing_address: "lorem Ipsum",
    });
  };

  useEffect(() => {
    if (placeOrderSuccess) {
      toast({
        title: "Order Placed SuccessFully!!",
        variant: "success",
        duration: 1000,
      });

      // resetCart({
      //   user_id: 4,
      // });
      dispatch(setDeleteAllQuantity());
      navigate(ROUTES.myOrders);
    }

    if (placeOrderError) {
      toast({
        title: "Try Placing Ordering Again!!!",
        variant: "destructive",
        duration: 1500,
      });
    }
  }, [placeOrderSuccess, placeOrderError]);

  return (
    <main id="placeOrder" className="lg:py-10 py-4">
      <section className="placeOrderSection !lg:py-[100px] md:gap-[70px]">
        <div className="flex items-center lg:justify-between justify-center flex-wrap lg:gap-0 gap-5">
          <form className="lg:w-[50%] w-[100%]">
            <div className="lg:mb-6 mb-4 w-max mr-auto">
              <Heading headingText="Delivery Information" />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full mb-2">
              <div className="input_wrap">
                <Input
                  placeholder="First Name"
                  size="md"
                  className="w-full rounded-sm"
                  variant="tertiary"
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  value={formFields?.["first_name"]}
                />
              </div>
              <div className="input_wrap">
                <Input
                  placeholder="Last Name"
                  size="md"
                  className="w-full rounded-sm"
                  variant="tertiary"
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  value={formFields?.["last_name"]}
                />
              </div>
            </div>
            <div className="input_wrap w-full mb-2">
              <Input
                placeholder="Email Address"
                size="md"
                className="w-full rounded-sm"
                variant="tertiary"
                type="email"
                onChange={(e) => handleChange("email_address", e.target.value)}
                value={formFields?.["email_address"]}
              />
            </div>
            <div className="input_wrap w-full mb-2">
              <Input
                placeholder="Street"
                size="md"
                className="w-full rounded-sm"
                variant="tertiary"
                onChange={(e) => handleChange("street", e.target.value)}
                value={formFields?.["street"]}
              />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full mb-2">
              <div className="input_wrap">
                <Input
                  placeholder="City"
                  size="md"
                  className="w-full rounded-sm"
                  variant="tertiary"
                  onChange={(e) => handleChange("city", e.target.value)}
                  value={formFields?.["city"]}
                />
              </div>
              <div className="input_wrap">
                <Input
                  placeholder="State"
                  size="md"
                  className="w-full rounded-sm"
                  variant="tertiary"
                  onChange={(e) => handleChange("state", e.target.value)}
                  value={formFields?.["state"]}
                />
              </div>
              <div className="input_wrap">
                <Input
                  placeholder="Zip Code"
                  size="md"
                  className="w-full rounded-sm"
                  variant="tertiary"
                  onChange={(e) => handleChange("zip_code", e.target.value)}
                  value={formFields?.["zip_code"]}
                />
              </div>
              <div className="input_wrap">
                <Input
                  placeholder="Country"
                  size="md"
                  className="w-full rounded-sm"
                  variant="tertiary"
                  onChange={(e) => handleChange("country", e.target.value)}
                  value={formFields?.["country"]}
                />
              </div>
            </div>
            <div className="input_wrap w-full">
              <Input
                placeholder="Street"
                size="md"
                className="w-full rounded-sm"
                variant="tertiary"
                onChange={(e) => handleChange("street", e.target.value)}
                value={formFields?.["street"]}
              />
            </div>
          </form>
          <div className="lg:w-[50%] w-full">
            <div className="lg:mb-5 mb-3">
              <CartTotal showButton={false} />
            </div>
            <div className="max-w-[600px] w-full ml-auto">
              <div className="mb-2 mr-auto w-max">
                <Heading headingText="Payment Method" />
              </div>
              <div className="flex items-center justify-start flex-wrap gap-3 mb-10">
                <button className="border border-solid border-gay-300 px-6 py-2 rounded-sm text-black bg-white inline-flex items-center justify-center gap-2 min-w-[150px]">
                  <img src={stripeImg} alt="Reload Page" className="h-[30px]" />
                </button>
                <button className="border border-solid border-gay-300 px-6 py-2 rounded-sm text-black bg-white inline-flex items-center justify-center gap-2 min-w-[150px]">
                  <img src={razorPays} alt="Reload Page" className="h-[30px]" />
                </button>
                <button className="border border-solid border-gay-300 px-6 py-2 rounded-sm text-black bg-white inline-flex items-center justify-center gap-2 min-w-[150px] h-[48px] font-bold">
                  cash on delivery
                </button>
              </div>
              <div className="button_wrap">
                <Button
                  onClick={handlePlaceOrder}
                  isLoading={placeOrderLoading}
                  variant="primary"
                  size="sm"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlaceOrder;
