import { getUsers } from "@/api/users";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useQueryUsers = () => {
  const query = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  return query;
};
