import { ROUTES } from "@/routes";
import { Link } from "react-router-dom";
import bannerImg from "@/assets/images/frontend_assets/hero_img.png";

interface BannerProps {
  image?: string;
  caption?: string;
  heading?: string;
  linkText?: string;
  linkUrl?: string;
}

const Banner = ({
  image,
  caption,
  heading,
  linkText,
  linkUrl = "/",
}: BannerProps) => {
  return (
    <section className="bannerSection pt-0">
      <div className="bannerWrapper border border-solid border-[#99999934] min-h-[600px] w-full flex items-stretch lg:flex-row flex-col-reverse justify-between lg:justify-normal gap-3 lg:gap-0">
        <div className="lg:w-[50%] w-full flex items-center justify-center lg:py-0 py-5">
          <div className="text_wrap">
            <h5 className="flex items-center justify-start gap-3 lg:text-[20px] text-[17px] font-[500] capitalize mb-2">
              <div className="w-[70px] h-[2px] bg-black"></div>
              {caption || "OUR BESTSELLERS"}
            </h5>
            <h1 className="lg:text-[50px] text-[30px] font-bold capitalize mb-3">
              {heading || "Lastest Arrivals"}
            </h1>
            <Link
              to={ROUTES.base || linkUrl}
              className="text-black font-[500] lg:text-[20px] text-[17px] uppercase flex items-center justify-start gap-3"
            >
              {linkText || "SHOP"}
              <div className="w-[70px] h-[2px] bg-black"></div>
            </Link>
          </div>
        </div>
        <div className="lg:w-[50%] w-full bg-[#FEDDD4] flex items-end justify-end flex-grow">
          <figure className="img_wrap">
            <img src={image || bannerImg} alt="Reload Page" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Banner;
