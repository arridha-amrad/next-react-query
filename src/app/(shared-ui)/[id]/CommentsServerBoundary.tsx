import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import Comments from "./Comments";
import { getComments } from "@/api/comments";

export default async function CommentsServerBoundary({
  postId,
}: {
  postId: string;
}) {
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
