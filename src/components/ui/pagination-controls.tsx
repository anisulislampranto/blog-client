'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
    meta: {
        limit: number,
        page: number,
        total: number,
        totalPages: number
    }
}

export function PaginationControls({ meta }: PaginationControlsProps) {
    const { limit, page, total, totalPages } = meta;
    const searParams = useSearchParams()
    const router = useRouter()

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searParams.toString())
        params.set("page", page.toString())
        router.push(`?${params.toString()}`)
        console.log('params', params);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={() => navigateToPage(page - 1)} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={() => navigateToPage(page + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
