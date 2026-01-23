'use client';

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function AboutPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        (async() => {
            const data = await getBlogs();
            setBlogs(data?.data?.data?.data)
        })()
    }, [])


    console.log('blogs', blogs);


    return (
        <div>{blogs.length}</div>
    )
}
