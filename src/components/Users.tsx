"use client";

import { getUsers } from "@/api/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import ButtonDeleteUser from "./ButtonDeleteUser";

export default function Users() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <div>loading users...</div>;
  }

  return (
    <div className="pt-4">
      <ul className="">
        {data.map((user, i) => (
          <li
            className={`space-x-2 flex justify-between p-2 border-x border-t border-slate-700 ${
              i === data.length - 1 && "border-b"
            }`}
            key={user.id}
          >
            <p>{user.username}</p>
            <ButtonDeleteUser userId={user.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
