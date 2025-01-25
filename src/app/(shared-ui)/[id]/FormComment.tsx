"use client";

import { Comment, createComment } from "@/api/comments";
import { useAuth } from "@/hooks/rq/queries/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function FormComment() {
  const { id } = useParams() as { id: string };
  const me = useAuth();
  const [body, setBody] = useState("");
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (userId: string) => createComment({ body, postId: id, userId }),
    onSuccess: (data) => {
      setBody("");
      qc.setQueryData(["comments", id], (comments: Comment[]) => [
        data,
        ...comments,
      ]);
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: ["comments", id],
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!me) {
      return alert("Please select user at navbar");
    }
    mutate(me.id);
  };

  return (
    <fieldset disabled={isPending}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment..."
          className="w-full text-sm py-2 rounded-none bg-black border-b border-slate-700 outline-none"
          rows={1}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 w-[100px] py-1 text-sm px-4 rounded"
        >
          {isPending ? "loading" : "Submit"}
        </button>
      </form>
    </fieldset>
  );
}
