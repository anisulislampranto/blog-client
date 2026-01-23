'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import { useForm } from '@tanstack/react-form'

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: async ({ value }) => {
      console.log('value', value);
    }
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={() =>
                <Field>

                </Field>
              }
            />


          </FieldGroup>

        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button form="signup-form" type="submit">Click</Button>
      </CardFooter>
    </Card>
  )
}
