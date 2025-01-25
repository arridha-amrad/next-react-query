"use client";

import { createPost, Post } from "@/api/posts";
import { useAuth } from "@/hooks/rq/queries/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [body, setBody] = useState("");
  const authUser = useAuth();
  const qc = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess(data) {
      qc.setQueryData(["posts"], (old: Post[]) => [data, ...old]);
    },
    async onSettled() {
      await qc.invalidateQueries({ queryKey: ["posts"] });
      router.push("/");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authUser) {
      return alert("Please select auth user at navbar");
    }
    mutate({ body, userId: authUser.id as string });
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <fieldset disabled={isPending}>
        <form
          onSubmit={handleSubmit}
          className="border border-slate-700 p-4  overflow-hidden"
        >
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full outline-none rounded-lg bg-slate-700 px-4 py-2 text-lg"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 disabled:bg-blue-900 rounded-lg px-4 w-[200px] py-2 text-sm font-medium"
          >
            {isPending ? "loading..." : "Create new post"}
          </button>
        </form>
      </fieldset>
    </div>
  );
}
