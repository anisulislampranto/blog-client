import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function HistoryPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const { page } = await searchParams
    const { data } = await blogService.getBlogPosts({ page });
    const posts = data?.data?.data ?? []

    return (
        <div>
            <HistoryTable posts={posts} />
        </div>
    )
}
