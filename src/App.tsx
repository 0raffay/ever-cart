import { Button } from "@/components/ui/button";
import { useLoginMutation } from "./app/services/authApi";
import { useToast } from "./hooks/use-toast";
import { setCredentials } from "./app/features/auth/authSlice";
import { useAppDispatch } from "./app/hooks";

function App() {
  const dispatch = useAppDispatch();
	const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const { toast } = useToast()

	const handleSubmit = async () => {
		try {
			 const response = await login({
				username: "0raffay123123123123",
				password: "Raffay@4146",
			}).unwrap();

      dispatch(setCredentials({ token: response.token, user: response.user }));

      toast({
        title: "Login Successfull",
        description: "Friday, February 10, 2023 at 5:57 PM",
        variant: "primary"
      })

		} catch (err) {}
	};

	return (
		<div>
			<Button isLoading={isLoggingIn} onClick={handleSubmit}>Click me</Button>
		</div>
	);
}

export default App;
