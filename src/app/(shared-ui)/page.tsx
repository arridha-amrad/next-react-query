import { getPosts } from "@/api/posts";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Posts from "./Posts";
import { Suspense } from "react";

export default function Page() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-3 gap-4">
        <HydrationBoundary>
          <Suspense fallback={<p>fetch posts...</p>}>
            <Posts />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
