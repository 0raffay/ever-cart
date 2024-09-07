import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldComponent } from "@/components/FieldComponent";

export default function Register() {
	const registerForm = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			username: "",
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		console.log(values);
	}

	return (
		<div>
			<Form {...registerForm}>
				<form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-8">
					<FormFieldComponent
						name="email"
						label="Email"
						placeholder="example@mail.com"
						control={registerForm.control}
						render={(field) => <Input type="email" {...field} />}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
