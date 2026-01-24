import CreateBlogFromServer from "@/components/modules/user/createBlog/CreateBlogFromServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogPage() {
    const {data} = await blogService.getBlogPosts({}, {cache: 'no-store'});


    return (
        <div>
            <CreateBlogFromServer />

            {
                data.data.data.map((el: BlogPost) => <p key={el.id}>{el.title}</p>)
            }
        </div>
    )
}
