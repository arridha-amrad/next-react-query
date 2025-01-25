"use client";

import { getComments } from "@/api/comments";
import CommentCard from "@/components/CommentCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Comments() {
  const { id } = useParams();
  const postId = id as string;

  const { data } = useSuspenseQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  if (data.length === 0) return null;

  return (
    <>
      <div className="pb-4">
        <h1 className="font-semibold text-xl">Comments</h1>
      </div>
      <div className="space-y-4">
        {data.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
