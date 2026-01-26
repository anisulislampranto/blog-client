import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BlogPost } from "@/types";

export default function HistoryTable({ posts }: { posts: BlogPost[] }) {
    return (
        <div className="border rounded-md">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts?.map((el) => (
                        <TableRow>
                            <TableCell>{el.title}</TableCell>
                            <TableCell>{el.title}</TableCell>
                            <TableCell>{el.title}</TableCell>
                            <TableCell>{el.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
