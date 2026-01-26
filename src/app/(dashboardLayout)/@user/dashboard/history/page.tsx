import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function HistoryPage() {
    const { data } = await blogService.getBlogPosts();
    const posts = data?.data?.data ?? []

    return (
        <div>
            {
                posts?.map((el: BlogPost) => <p key={el.id}>{el.title}</p>)
            }
        </div>
    )
}
