import Banner from "@/components/home/Banner";
import ProductCardList from "@/components/ProductCardList";
import serviceIconOne from "@/assets/images/frontend_assets/exchange_icon.png";
import serviceIconTwo from "@/assets/images/frontend_assets/support_img.png";
import serviceIconThree from "@/assets/images/frontend_assets/quality_icon.png";
import ServiceCardList from "@/components/home/ServiceCardList";
import NewsLetter from "@/components/home/NewsLetter";
import { useGetUserProductListQuery } from "@/app/services/product/productApiSlice";

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
  const {
    isLoading: productLoading,
    data: productData,
    isSuccess: productSuccess,
    error: productError,
  } = useGetUserProductListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <main>
      <Banner />
      <ProductCardList
        heading="Latest Collections"
        products={productData?.data}
        loading={productLoading}
        success={productSuccess}
        error={productError}
      />
      <ProductCardList
        heading="Best Sellers"
        products={productData?.data}
        loading={productLoading}
        success={productSuccess}
        error={productError}
      />
      <ServiceCardList cardData={cardData} />
      <NewsLetter />
    </main>
  );
};

export default Home;
