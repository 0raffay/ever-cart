import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@radix-ui/react-toast";

const NewsLetter = () => {
  const { toast } = useToast();

  const [newsLetterValue, setNewsLetterValue] = useState("");

  const handleClick = () => {
    if (!newsLetterValue) {
      toast({
        title: "Please fill the email field!!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email Submitted Successfully.",
      variant: "success",
    });

    setNewsLetterValue("");
  };

  return (
    <section className="newsLetterSection max-w-[700px] w-full mx-auto">
      <div className="text_wrap mb-5 text-center">
        <h5 className="text-black text-[20px] font-medium mb-3">
          Subscribe now & get 20% off
        </h5>
        <p className="text-[#999] text-[14px] font-[400]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem,
          cumque.
        </p>
      </div>
      <div className="newsLetterWrapper flex items-center justify-between max-w-[700px] w-full overflow-hidden border border-black border-solid h-[45px]">
        <Input
          placeholder="Enter your email"
          variant="tertiary"
          className="flex-1 border-none focus-visible:ring-0"
          onChange={(e) => setNewsLetterValue(e.target.value)}
          value={newsLetterValue}
        />
        <Button
          variant="primary"
          size="md"
          className="border border-solid border-black hover:bg-black hover:opacity-[.9] transtion-all duration-300 hover:text-white"
          onClick={handleClick}
        >
          subscribe
        </Button>
      </div>
    </section>
  );
};

export default NewsLetter;
