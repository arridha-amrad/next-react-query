import { getPostById } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";

export default function Info({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });
  if (!data) return <div>Post not found</div>;
  return <div>likers : {data.likers.length}</div>;
}
