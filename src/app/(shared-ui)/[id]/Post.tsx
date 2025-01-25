"use client";

import { getPostById } from "@/api/posts";
import PostCard from "@/components/PostCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Post() {
  const { id } = useParams() as { id: string };
  const { data } = useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id, true),
  });

  if (!data) {
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );
  }
  return <PostCard post={data} />;
}
