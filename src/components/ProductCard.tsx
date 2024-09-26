import productImg from "@/assets/images/frontend_assets/p_img1.png";
import { Link } from "react-router-dom";

interface ProductCardProps {
  img: string;
  desc: string;
  price: string;
  id: string | number;
}

const ProductCard = ({ item: { img, desc, price, id } }: ProductCardProps) => {
  return (
    <div className="productCard max-w-[300px] w-full group hover:cursor-pointer">
      <Link to={`/${id}`}>
        <div className="img_wrap mb-2 overflow-hidden">
          <img
            src={img || productImg}
            alt="Reload Page"
            className="group-hover:scale-[1.2] transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="text_wrap w-full">
          <p className="lg:text-[16px] text-[14px] font-medium text-black truncate mb-1 leading-normal">
            {desc ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, hic."}
          </p>
          <span className="text-black text-[14px] font-[500]">
            {price || "$90"}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
