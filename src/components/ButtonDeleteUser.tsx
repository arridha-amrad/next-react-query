import { removeUser, User } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ButtonDeleteUser({ userId }: { userId: string }) {
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeUser,
    onSuccess(_, userId) {
      qc.setQueryData(["users"], (old: User[]) => [
        ...old.filter((v) => v.id !== userId),
      ]);
    },
    onSettled() {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button
      disabled={isPending}
      onClick={() => mutate(userId)}
      className="bg-red-500 disabled:bg-red-300 px-2 py-1 rounded-lg text-xs"
    >
      {isPending ? "..." : "del"}
    </button>
  );
}
