interface HeadingProps {
  headingText: string;
}

const Heading = ({ headingText }: HeadingProps) => {
  const heading = headingText.split(" ");

  return (
    <h5 className="heading relative text-[30px] font-[500] uppercase text-black flex items-center justify-center gap-x-2 mb-[10px]">
      <span className="text-[#999]">{heading[0]}</span>
      {heading.slice(1).map((item, index) => (
        <span key={index}> {item}</span>
      ))}
    </h5>
  );
};

export default Heading;
