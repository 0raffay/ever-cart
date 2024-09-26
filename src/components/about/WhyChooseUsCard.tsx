interface CardsProps {
  heading: string | null;
  desc: string | null;
}

const WhyChooseUsCard = ({ heading, desc }: CardsProps) => {
  return (
    <div className="whyChooseUSCard lg:min-h-[300px] h-auto w-full flex items-center justify-center flex-col">
      <h5 className="text-black lg:text-[20px] text-[16px] font-medium leading-1 mb-4">
        {heading || "Quality Assurance"}
      </h5>
      <p className="text-[14px] text-[#999] leadin-1 text-center">
        {desc ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora harum laudantium aspernatur ipsum iure blanditiis placeat illum assumenda natus repudiandae."}
      </p>
    </div>
  );
};

export default WhyChooseUsCard;
