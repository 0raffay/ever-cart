import * as React from "react";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/app/services/authApi";
import { useToast } from "@/hooks/use-toast";
import {
  selectIsAuthenticated,
  setCredentials,
} from "@/app/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

export default function Login() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [login, { isLoading: isLoggingIn, error }] = useLoginMutation();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Please Fill the required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await login({
        username: email,
        password: password,
      }).unwrap();

      dispatch(setCredentials({ token: response.token, user: response.user }));
      navigate(ROUTES.base);
      toast({
        title: "You have logged in successfully.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: `We are having an error ${error}`,
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to={ROUTES.base} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="lg:text-[45px] text-[25px] font-bold text-black uppercase text-center lg:mb-5 mb-4">
          Login In
        </h1>
        <Input
          placeholder="Email"
          variant="tertiary"
          type="email"
          className="min-w-[450px] h-[50px] mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          variant="tertiary"
          type="password"
          className="min-w-[450px] h-[50px] mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between mb-8">
          <Link>Forget Your Password?</Link>
          <Link to={ROUTES.register}>Create account</Link>
        </div>
        <Button
          isLoading={isLoggingIn}
          onClick={handleSubmit}
          variant="primary"
          size="md"
          className="!font-[400]"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
