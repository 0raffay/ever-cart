import { useEffect } from "react";
import Heading from "./Heading";
import ProductCard from "./ProductCard";
import Skeleton from "./Skeleton";
import { toast, useToast } from "@/hooks/use-toast";

interface productsDataProps {
  products: {
    img: string;
    desc: string;
    price: string | number;
    id: string | number | null;
  };
}

interface ProductCardListProps {
  heading?: string;
  desc?: string | null;
  loading: boolean;
  success: boolean;
  error: any;
  products: productsDataProps[];
}

const ProductCardList = ({
  heading,
  desc,
  products,
  success,
  error,
  loading,
}: ProductCardListProps) => {
  const { toast } = useToast();

  let content;
  if (loading) {
    content = Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-[300px] w-[300px]" />
    ));
    console.log("loading is working");
  } else if (success) {
    content = products?.map((item: any, index: number) => {
      return <ProductCard item={item} key={index} />;
    });
  } else if (error) {
    console.error("error", error);
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "Please try again!!!",
        variant: "destructive",
        duration: 1000,
      });
    }
  }, [error]);

  return (
    <>
      <section>
        <div className="text_wrap text-center mb-5">
          <Heading headingText={heading || "Latest Collections"} />
          <p className="text-gray-600 lg:text-[16px] text-[14px] font-medium">
            {desc ||
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non voluptates est accusamus sequi molestiae nostrum."}
          </p>
        </div>
        <div className="flex items-center lg:justify-start justify-center lg:gap-7 gap-10 flex-wrap">
          {content}
        </div>
      </section>
    </>
  );
};

export default ProductCardList;
