'use client';
import { createBlogPost } from '@/actions/blog.action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form';
import { toast } from "sonner";
import * as z from 'zod';

const formSchema = z.object({
    title: z.string(),
    content: z.string(),
    tags: z.string()
})

export function CreateBlogFromClient({ ...props }: React.ComponentProps<typeof Card>) {
    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: ""
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading('Creating Blog Post!');
            const blogData = {
                ...value,
                tags: value.tags.split(",").map((el) => el.trim()).filter((item) => item !== '')
            }

            try {
                const res = await createBlogPost(blogData);

                if (res.error) {
                    toast.success(res.error.message, { id: toastId })
                    return 
                }

                toast.success('Blog Post Created!', { id: toastId })
            } catch (err) {
                toast.error('Something went wrong please try again!', { id: toastId })
            }
        }
    });

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create Blog Post</CardTitle>
                <CardDescription>
                    You Can write your blog here!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="blog-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="content"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="tags"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Tags (Comma separated)</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />
                    </FieldGroup>

                </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-end gap-5">
                <Button form="blog-form" type="submit" className="w-full">Create Blog</Button>
            </CardFooter>
        </Card>
    )
}
