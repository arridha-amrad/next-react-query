"use client";

import { getUserById } from "@/api/users";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function PostCardUser({ userId }: { userId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: [`user-${userId}`],
    queryFn: () => getUserById(userId),
  });
  return <h1 className="font-semibold">{data && data.username}</h1>;
}
