"use client";

import { Post } from "@/api/posts";
import { UserIcon } from "@heroicons/react/16/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ButtonLike from "./ButtonLike";
import PostLovers from "./PostLovers";
import PostDate from "../Date";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/${post.id}`)}
      className="border flex flex-col cursor-pointer p-4 border-slate-700 space-y-4 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <div className="border rounded-full border-slate-700">
          <UserIcon className="w-8" />
        </div>
        <div className="flex flex-col text-sm">
          <h1>{post.user?.username}</h1>
          <PostDate createdAt={post.createdAt} />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-slate-300 line-clamp-2">{post.body}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {post.likers.length > 0 && <span>{post.likers.length}</span>}
          <ButtonLike post={post} />
        </div>
        <button>
          <ChatBubbleLeftIcon className="w-6" />
        </button>
      </div>
      {post.likers.length > 0 && (
        <div className="text-sm text-slate-500 line-clamp-1">
          <PostLovers post={post} />
        </div>
      )}
    </div>
  );
}
