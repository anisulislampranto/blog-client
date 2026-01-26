import { Route } from "@/types";

export const UserRoutes: Route[] = [
    {
        title: "Blog Management",
        items: [
            {
                title: "Create Blog",
                url: "/dashboard/create-blog",
            },
            {
                title: "History",
                url: "/dashboard/history",
            },
        ],
    },
]