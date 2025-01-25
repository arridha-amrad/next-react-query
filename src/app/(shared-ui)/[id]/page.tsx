import { getPostById } from "@/api/posts";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";

import FormComment from "./FormComment";
import Post from "./Post";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Params) {
  const postId = (await params).id;
  const qc = new QueryClient();

  qc.prefetchQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId, true),
  });

  return (
    <>
      <div className="py-4">
        <Link
          className="flex items-center gap-2 hover:ring ring-slate-700 rounded-lg p-2 w-fit"
          href="/"
        >
          <ChevronLeftIcon className="w-5" />
          Posts
        </Link>
      </div>
      <div>
        <HydrationBoundary state={dehydrate(qc)}>
          <Suspense fallback={<p>loading the post...</p>}>
            <Post />
          </Suspense>
        </HydrationBoundary>
        <div className="py-8">
          <FormComment />
        </div>
      </div>
    </>
  );
}
