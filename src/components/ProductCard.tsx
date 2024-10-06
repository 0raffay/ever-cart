import productImg from "@/assets/images/frontend_assets/p_img1.png";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { baseUrl } from "@/constant";

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  price: string;
  product_images: { image_url: string }[];
}

interface ProductCardComponentProps {
  item: ProductCardProps;
}

const ProductCard = ({ item }: ProductCardComponentProps) => {
  const { id, name, description, price, product_images } = item;

  return (
    <div className="productCard max-w-[300px] w-full group hover:cursor-pointer">
      <Link to={`${ROUTES.productDetails}/${id}`}>
        <div className="img_wrap mb-2 overflow-hidden">
          <img
            src={
              product_images?.[0]?.image_url
                ? baseUrl + product_images[0].image_url
                : productImg
            }
            alt={name || "Product Image"}
            className="group-hover:scale-[1.2] transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="text_wrap w-full">
          <p className="lg:text-[16px] text-[14px] font-medium text-black truncate mb-1 leading-normal">
            {name || "Default product name"}
          </p>
          <p className="lg:text-[14px] text-[14px] font-medium text-black truncate mb-1 leading-normal">
            {description || "Default product description"}
          </p>
          <span className="text-black text-[14px] font-[500]">
            ${price || "90"}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
