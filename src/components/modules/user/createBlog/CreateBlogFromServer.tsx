import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL

export default async function CreateBlogFromServer() {    

    const createBlog = async (formData: FormData) => {
        "use server";
        console.log('formData', formData.get('title'));
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tags = formData.get("tags") as string;

        const blogData = {
            title,
            content,
            tags: tags.split(",").map((el) => el.trim()).filter((el) => el !== "")
        }

        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-type":"application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogData)
        })

        if (res.ok) {
            revalidateTag('blogPosts', "max")
            // updateTag("blogPosts") -> use either
        }

        console.log('res', res);
    }

    return (
        <div>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>
                        Create Blog
                    </CardTitle>
                    <CardDescription>
                        You Can write your blog here!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="blog-form" action={createBlog}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input type="text" name="title" placeholder="Title" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="content">Content</FieldLabel>
                                <Textarea id="content" name="content" placeholder="Write you blog" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="tags">Tags (Comma separated)</FieldLabel>
                                <Input type="text" name="tags" placeholder="nextjs, web" required />
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" form="blog-form" type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
