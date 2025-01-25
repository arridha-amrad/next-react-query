import { getUsers } from "@/api/users";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Users from "../../components/Users";
import FormCreateUser from "../../components/FormCreateUser";
import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default async function Page() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div className="w-full max-w-sm mx-auto py-10">
      <div className="pb-4 flex items-center justify-center">
        <Link
          className="inline-flex hover:ring p-2 rounded-lg ring-slate-700 items-center gap-2"
          href="/"
        >
          <HomeIcon className="w-6 inline" />
          <span className="inline">Home</span>
        </Link>
      </div>
      <div className="mb-10">
        <FormCreateUser />
      </div>
      <div>
        <h1 className="font-semibold text-3xl tracking-tight">List of users</h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Users />
      </HydrationBoundary>
    </div>
  );
}
