import ServiceCard from "./ServiceCard";

interface ServiceCardListProps {
  icon: string;
  heading: string;
  desc: string;
}

const ServiceCardList = ({ cardData }: ServiceCardListProps) => {
  return (
    <section className="serviceSection">
      <div className="flex lg:items-center lg:justify-between flex-wrap items-center justify-center gap-5">
        {cardData.map((item, index) => {
          return <ServiceCard item={item} key={index} />;
        })}
      </div>
    </section>
  );
};

export default ServiceCardList;
