import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";

export default async function HistoryPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const { page } = await searchParams
    const { data } = await blogService.getBlogPosts({ page });
    const posts = data?.data?.data ?? []
    const pagination = data.data.pagination ?? {
        limit: 10,
        page: 1,
        total: 1,
        totalPages: 1
    }

    return (
        <div>
            <HistoryTable posts={posts} />
            <PaginationControls meta={pagination} />
        </div>
    )
}
