import { getUsers } from "@/api/users";
import UserPicker from "@/components/UserPicker";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div>
      <nav className="h-14 flex items-center justify-center gap-4 bg-neutral-900">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserPicker />
        </HydrationBoundary>
        <div className="">
          <Link className="flex items-center gap-2 px-4 py-1" href="/new-post">
            <PlusIcon className="w-5" />
            <p>Post</p>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
