import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data } = useQuery({
    queryKey: ["auth-user"],
  });
  const user = data as null | undefined | { id: string; username: string };
  return user;
};
