import contactImg from "@/assets/images/frontend_assets/contact_img.png";
import Heading from "@/components/Heading";
import NewsLetter from "@/components/home/NewsLetter";

const Contact = () => {
  return (
    <main id="contact-us">
      <div className="text_wrap pt-10">
        <Heading headingText="Contact Us" />
      </div>

      <section className="contactEvenSecion">
        <div className="flex items-center flex-wrap justify-center gap-5">
          <div className="img_warp max-w-[500px] w-full">
            <img
              src={contactImg}
              alt="Reload Page"
              className="w-full object-cover"
            />
          </div>
          <div className="text_wrap max-w-[700px]">
            <h5 className="text-black font-bold text-[14px] mb-3">
              Our Mission
            </h5>
            <p className="text-[#999] lg:text-[16px] text-[14px] leading-1 mb-1 font-medium">
              54709
            </p>
            <p className="text-[#999] lg:text-[16px] text-[14px] leading-1 mb-1 font-medium">
              Suite 350, Washington, USA
            </p>
            <p className="text-[#999] lg:text-[16px] text-[14px] leading-1 mb-4 font-medium">
              Tel: (415)-555-0312
            </p>
            <h5 className="text-black font-bold text-[14px] mb-3">
              Careers at Forever
            </h5>
            <p className="text-[#999] lg:text-[16px] text-[14px] leading-1 mb-1 font-medium">
              Suite 350, Washington, USA
            </p>
          </div>
        </div>
      </section>

      <NewsLetter />
    </main>
  );
};

export default Contact;
