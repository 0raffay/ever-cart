import Heading from "./Heading";
import ProductCard from "./ProductCard";

interface ProductCardListProps {
  heading: string;
  desc: string | null;
  products: {
    img: string;
    desc: string;
    price: string | number;
    id: string | number | null;
  };
}

const ProductCardList = ({ heading, desc, products }: ProductCardListProps) => {
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
        <div className="flex items-center justify-center gap-7 flex-wrap">
          {products.map((item, index) => {
            return <ProductCard item={item} key={index} />;
          })}
        </div>
      </section>
    </>
  );
};

export default ProductCardList;
