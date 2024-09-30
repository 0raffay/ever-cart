interface ServiceCardProps {
  icon: string;
  heading: string;
  desc: string;
}

const ServiceCard = ({ item: { icon, heading, desc } }: ServiceCardProps) => {
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="icon_wrap mb-3">
        <img src={icon} alt="Reload Page" />
      </div>
      <h5 className="text-black font-[400] capitalize mb-[5px]">{heading}</h5>
      <p className="text-[#666666a5] text-[14px] font-[400]">{desc}</p>
    </div>
  );
};

export default ServiceCard;
