import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const AdminLogin = () => {
  const { toast } = useToast();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!emailValue || !passwordRef) {
      toast({
        title: "Please fill the required fields!!!",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="h-screen w-full bg-[#F9FBFC] grid place-content-center">
      <div
        className="adminLoginForm lg:min-w-[400px] w-[350px] rounded-sm overflow-hidden py-6 px-4 bg-white shadom-md
        border border-solid border-[#9999996a]
      "
      >
        <h5 className="text-black font-bold text-[25px] mb-4 capitalize">
          Admin Panel
        </h5>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="field_wrap mb-4">
            <label htmlFor="email" className="mb-1 text-black lg:text-[16px] text-[14px] font-medium">
              Email Address
            </label>
            <Input
              variant="tertiary"
              placeholder="your@email.com"
              ref={emailRef}
              id="email"
            />
          </div>
          <div className="field_wrap mb-4">
            <label htmlFor="password" className="mb-1 text-black lg:text-[16px] text-[14px] font-medium">
              Password
            </label>
            <Input
              variant="tertiary"
              placeholder="Enter your password"
              id="password"
              ref={passwordRef}
            />
          </div>
          <div className="button_wrap">
            <Button variant="primary" size="md" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
