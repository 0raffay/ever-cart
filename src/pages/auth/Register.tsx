import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldComponent } from "@/components/FieldComponent";
import { useRegisterMutation } from "@/app/services/authApi";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const { toast } = useToast()

	const registerForm = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	});

  const [register, {isLoading}] = useRegisterMutation() 

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		console.log(values);
    try {
      const response = await register({email: "something", password: "", username: "0"});
      console.log('repsonse', response)
    } catch (error) {
      toast({
        title: JSON.stringify(error),
        variant: "destructive"
      })

    }

	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <Form {...registerForm}>
					<form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-4">
						<FormFieldComponent
							name="username"
							label="Username"
							placeholder="Enter your username"
							control={registerForm.control}
							render={(field) => <Input {...field} placeholder="Enter your username" />}
						/>
						<FormFieldComponent
							name="email"
							label="Email"
							placeholder="Enter your email"
							control={registerForm.control}
							render={(field) => <Input type="email" {...field} placeholder="Enter your email" />}
						/>
						<FormFieldComponent
							name="password"
							label="Password"
							placeholder="Enter your password"
							control={registerForm.control}
							render={(field) => <Input type="password" {...field} placeholder="Enter your password" />}
						/>
						<Button isLoading={isLoading} type="submit" >
							Sign Up
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
