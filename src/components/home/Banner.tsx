import { ROUTES } from "@/routes";
import { Link } from "react-router-dom";
import bannerImg from "@/assets/images/frontend_assets/hero_img.png";

interface BannerProps {
  image: string;
  caption: string;
  heading: string;
  linkText: string;
  linkUrl: string;
}

const Banner = ({
  image,
  caption,
  heading,
  linkText,
  linkUrl,
}: BannerProps) => {
  return (
    <section className="bannerSection pt-0">
      <div className="bannerWrapper border border-solid border-[#99999934] min-h-[600px] w-full flex items-stretch lg:flex-row flex-col-reverse">
        <div className="w-[50%] flex items-center justify-center">
          <div className="text_wrap">
            <h5 className="flex items-center justify-start gap-3 text-[20px] font-[500] capitalize mb-2">
              <div className="w-[70px] h-[2px] bg-black"></div>
              {caption || "OUR BESTSELLERS"}
            </h5>
            <h1 className="text-[50px] font-bold capitalize mb-3">
              {heading || "Lastest Arrivals"}
            </h1>
            <Link
              to={ROUTES.base || linkUrl}
              className="text-black font-[500] text-[20px] uppercase flex items-center justify-start gap-3"
            >
              {linkText || "SHOP"}
              <div className="w-[70px] h-[2px] bg-black"></div>
            </Link>
          </div>
        </div>
        <div className="w-[50%] bg-[#FEDDD4] flex items-end justify-end">
          <figure className="img_wrap">
            <img src={image || bannerImg} alt="Reload Page" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Banner;
