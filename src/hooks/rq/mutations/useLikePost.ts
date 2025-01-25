import { likePost, Post } from "@/api/posts";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useLikePost = (postId: string) => {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userId: string) => likePost({ id: postId, userId }),
    onSuccess: async (data) => {
      qc.setQueryData(["post", postId], (old: Post) => ({
        ...old,
        ...data,
      }));
      qc.setQueryData(["posts"], (old: Post[]) => {
        const newArr = old.map((op) =>
          op.id === data?.id
            ? {
                ...op,
                ...data,
              }
            : op
        );
        return newArr;
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
  return mutation;
};
