import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/app/services/authApi";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useRef } from "react";

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const { toast } = useToast();

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function onSubmit() {
    const username = userNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
      toast({
        title: "Please fill the required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await register({
        email,
        password,
        username,
      });
      toast({
        title: "Account Created Successfully.",
        variant: "success",
      });
      navigate(ROUTES.login);
    } catch (error) {
      toast({
        title: JSON.stringify(error),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="form_wrap">
        <h1 className="lg:text-[45px] text-[25px] font-bold text-black uppercase text-center lg:mb-5 mb-4">
          Sign Up
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex items-center flex-col gap-4 justify-center mb-3"
        >
          <div className="input_wrap">
            <Input
              variant="tertiary"
              size="md"
              placeholder="Email"
              type="email"
              className="lg:min-w-[400px] w-full"
              ref={emailRef}
            />
          </div>
          <div className="input_wrap">
            <Input
              variant="tertiary"
              size="md"
              placeholder="Password"
              type="password"
              className="lg:min-w-[400px] w-full"
              ref={passwordRef}
            />
          </div>
          <div className="input_wrap">
            <Input
              variant="tertiary"
              size="md"
              placeholder="Username"
              type="text"
              className="lg:min-w-[400px] w-full"
              ref={userNameRef}
            />
          </div>
          <div>
            <Button variant="primary" size="md" isLoading={isLoading}>
              Sign Up
            </Button>
          </div>
        </form>
        <div className="text-center">
          if already have an account?
          <Link
            className="text-[#555] mx-1 text-[16px] font-bold"
            to={ROUTES.base}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
