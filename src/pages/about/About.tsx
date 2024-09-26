import Heading from "@/components/Heading";
import aboutImg from "@/assets/images/frontend_assets/about_img.png";
import NewsLetter from "@/components/home/NewsLetter";
import WhyChooseUsCard from "@/components/about/WhyChooseUsCard";

const About = () => {
  return (
    <main id="about">
      <div className="text_wrap pt-10">
        <Heading headingText="About Us" />
      </div>
      <section className="aboutEvenColSection">
        <div className="flex items-center lg:justify-between flex-wrap justify-center gap-5 lg:gap-0">
          <div className="img_warp max-w-[500px] w-full">
            <img
              src={aboutImg}
              alt="Reload Page"
              className="w-full object-cover"
            />
          </div>
          <div className="text_wrap max-w-[700px]">
            <p className="text-[#999] lg:text-[16px] text-[14px] leading-1 mb-3 font-medium">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              cupiditate, dolor aliquam reprehenderit aut animi non recusandae
              assumenda officia consectetur? Eveniet commodi doloremque quisquam
              architecto. Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Optio, natus.
            </p>
            <p className="text-[#999] lg:text-[16px] text-[14px] leading-1 mb-3 font-medium">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              cupiditate, dolor aliquam reprehenderit aut animi non recusandae
              assumenda officia consectetur? Eveniet commodi doloremque quisquam
              architecto. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Rem in nemo nulla qui neque impedit modi laudantium quas
              fuga minus.
            </p>
            <h5 className="text-black font-bold text-[14px] mb-3">
              Our Mission
            </h5>
            <p className="text-[#999] lg:text-[16px] text-[14px] leading-1 mb-3 font-medium">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              cupiditate, dolor aliquam reprehenderit aut animi non recusandae
              assumenda officia consectetur? Eveniet commodi doloremque quisquam
              architecto. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Ex ullam temporibus, consequuntur deleniti non voluptatem
              illo accusamus optio minus sit dolor dolores magnam dolorum fugit
              quos exercitationem atque. Eaque, quisquam.
            </p>
          </div>
        </div>
      </section>

      <section className="whyChooseUsSection">
        <div className="text_wrap lg:py-5 py-4">
          <Heading headingText="Why Choose Us" />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 grid-cols-1 border border-solid border-[#99999960] px-2 py-5">
          <WhyChooseUsCard />
          <WhyChooseUsCard heading="Convenience" />
          <WhyChooseUsCard heading="Exceptional Customer Service" />
        </div>
      </section>

      <NewsLetter />
    </main>
  );
};

export default About;
