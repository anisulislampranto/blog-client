import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function HistoryPage() {
    const { data } = await blogService.getBlogPosts();
    const posts = data?.data?.data ?? []

    return (
        <div>
            <HistoryTable posts={posts} />
        </div>
    )
}
