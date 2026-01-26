import { CreateBlogFromClient } from "@/components/modules/user/createBlog/CreateBlogFromClient";

export default async function CreateBlogPage() {

    return (
        <div>
            {/* <CreateBlogFromServer /> */}
            <CreateBlogFromClient />
        </div>
    )
}
