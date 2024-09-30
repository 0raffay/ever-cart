import Banner from "@/components/home/Banner";
import ProductCard from "@/components/ProductCard";
import ProductCardList from "@/components/ProductCardList";
import Skeleton from "@/components/Skeleton";

import productOneImg from "@/assets/images/frontend_assets/p_img1.png";
import productTwoImg from "@/assets/images/frontend_assets/p_img11.png";
import productThreeImg from "@/assets/images/frontend_assets/p_img12.png";
import productFourImg from "@/assets/images/frontend_assets/p_img13.png";
import productFiveImg from "@/assets/images/frontend_assets/p_img18.png";
import productSixImg from "@/assets/images/frontend_assets/p_img15.png";
import productSevenImg from "@/assets/images/frontend_assets/p_img14.png";
import productEightImg from "@/assets/images/frontend_assets/p_img19.png";
import productNineImg from "@/assets/images/frontend_assets/p_img21.png";
import productTenImg from "@/assets/images/frontend_assets/p_img28.png";

import serviceIconOne from "@/assets/images/frontend_assets/exchange_icon.png";
import serviceIconTwo from "@/assets/images/frontend_assets/support_img.png";
import serviceIconThree from "@/assets/images/frontend_assets/quality_icon.png";
import ServiceCardList from "@/components/home/ServiceCardList";
import NewsLetter from "@/components/home/NewsLetter";
import Footer from "@/components/Footer";

const products = [
  {
    id: 1,
    img: productOneImg,
    desc: "Comfortable summer wear for everyday use.",
    price: "$49.99",
  },
  {
    id: 2,
    img: productTwoImg,
    desc: "Elegant formal dress with a modern touch.",
    price: "$89.99",
  },
  {
    id: 3,
    img: productThreeImg,
    desc: "Stylish shoes designed for casual outings.",
    price: "$69.99",
  },
  {
    id: 4,
    img: productFourImg,
    desc: "Durable and spacious backpack for all occasions.",
    price: "$59.99",
  },
  {
    id: 5,
    img: productFiveImg,
    desc: "Casual sneakers perfect for running and walking.",
    price: "$79.99",
  },
  {
    id: 6,
    img: productSixImg,
    desc: "Elegant wristwatch with a leather strap.",
    price: "$120.00",
  },
  {
    id: 7,
    img: productSevenImg,
    desc: "Stylish sunglasses for sunny days.",
    price: "$45.00",
  },
  {
    id: 8,
    img: productEightImg,
    desc: "Luxury handbag for formal and casual wear.",
    price: "$150.00",
  },
  {
    id: 9,
    img: productNineImg,
    desc: "Winter jacket for cold weather protection.",
    price: "$199.99",
  },
  {
    id: 10,
    img: productTenImg,
    desc: "Trendy hat perfect for summer outings.",
    price: "$29.99",
  },
];

const bestSellers = [
  {
    id: 1,
    img: productOneImg,
    desc: "Comfortable summer wear for everyday use.",
    price: "$49.99",
  },
  {
    id: 2,
    img: productTwoImg,
    desc: "Elegant formal dress with a modern touch.",
    price: "$89.99",
  },
  {
    id: 3,
    img: productThreeImg,
    desc: "Stylish shoes designed for casual outings.",
    price: "$69.99",
  },
  {
    id: 4,
    img: productFourImg,
    desc: "Durable and spacious backpack for all occasions.",
    price: "$59.99",
  },
];

const cardData = [
  {
    icon: serviceIconOne,
    heading: "Easy Exchange Policy",
    desc: "We offer hassle free exchange policy",
  },
  {
    icon: serviceIconTwo,
    heading: "7 Days Return Policy",
    desc: "We provide 7 days free return policy",
  },
  {
    icon: serviceIconThree,
    heading: "Best Customer support",
    desc: "We provide 24/7 customer service",
  },
];

const Home = () => {
  return (
    <main>
      <Banner />
      <ProductCardList heading="Latest Collections" products={products} />
      <ProductCardList heading="Best Sellers" products={bestSellers} />
      <ServiceCardList cardData={cardData} />
      <NewsLetter />
    </main>
  );
};

export default Home;
