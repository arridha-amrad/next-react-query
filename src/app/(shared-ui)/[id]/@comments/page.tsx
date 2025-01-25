import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { getComments } from "@/api/comments";
import Comments from "../Comments";

export default async function Page({ postId }: { postId: string }) {
  const qc = new QueryClient();

  qc.prefetchQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Suspense fallback={<p>loading comments...</p>}>
        <Comments />
      </Suspense>
    </HydrationBoundary>
  );
}
