"use client";

import { createUser, User } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export default function FormCreateUser() {
  const [username, setUsername] = useState("");
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      qc.setQueryData(["users"], (old: User[]) => [...old, data]);
    },
    onSettled() {
      qc.invalidateQueries({ queryKey: ["users"] });
      setUsername("");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(username);
  };

  return (
    <fieldset disabled={isPending}>
      <form
        onSubmit={handleSubmit}
        className="border border-slate-500 p-4 space-y-4 rounded-lg"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="New username"
          className="py-3 focus:ring-2 focus:ring-blue-500 text-lg px-4 outline-none block w-full bg-slate-800"
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-2 text-sm bg-slate-200 text-black"
        >
          {isPending ? "loading..." : "Submit"}
        </button>
      </form>
    </fieldset>
  );
}
