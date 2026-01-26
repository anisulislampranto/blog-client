import { env } from "@/env"
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
    page?: string;
}

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export interface BlogData {
    title: string;
    content: string;
    tags?: string[]
}

const getBlogPosts = async (
    params?: GetBlogsParams,
    options?: ServiceOptions
) => {
    try {
        const url = new URL(`${API_URL}/posts`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    url.searchParams.append(key, value);
                }
            });
        }

        const config: RequestInit = {};

        if (options?.cache) {
            config.cache = options.cache;
        }

        if (options?.revalidate) {
            config.next = { revalidate: options.revalidate };
        }

        config.next = {
            ...config.next, tags: ['blogPosts']
        }

        const res = await fetch(url.toString(), config);

        const data = await res.json();

        return { data, error: null };

    } catch (error) {
        return {
            data: null,
            error: {
                message: 'Something went wrong'
            }
        }
    }
}

const getBlogPostById = async (
    id: string,
) => {
    try {
        const url = new URL(`${API_URL}/posts/${id}`);
        const res = await fetch(url.toString());
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: {
                message: 'Something went wrong'
            }
        }
    }
}

const createBlogPost = async (blogData: BlogData) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogData)
        })

        const data = await res.json()

        if (data.error) {
            return { data: null, error: { message: 'Post not created!' } }
        }


        return { data, error: null }

    } catch (error) {
        return {
            data: null,
            error: {
                message: 'Something went wrong'
            }
        }
    }
}


export const blogService = {
    getBlogPosts,
    getBlogPostById,
    createBlogPost
}