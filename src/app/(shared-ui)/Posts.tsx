"use client";

import { getPosts } from "@/api/posts";
import PostCard from "@/components/PostCard";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Posts() {
  const { data } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return data.map((post) => <PostCard post={post} key={post.id} />);
}
