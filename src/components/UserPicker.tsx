"use client";

import { User } from "@/api/users";
import { useQueryUsers } from "@/hooks/rq/queries/useQueryUsers";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserPicker() {
  const { data: people } = useQueryUsers();
  const qc = useQueryClient();
  const [query, setQuery] = useState("");

  const [selected, setSelected] = useState<User | null>(null);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.username.toLowerCase().includes(query.toLowerCase());
        });

  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <div onClick={() => router.push("/users")} className="cursor-pointer">
        <UserIcon className="w-5" />
      </div>
      <Combobox
        value={selected}
        onChange={(value: User) => {
          setSelected(value);
          qc.setQueryData(["auth-user"], (old: User) => ({ ...old, ...value }));
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            placeholder="Pick a user"
            className={clsx(
              "w-full rounded-lg border-none bg-slate-900 py-1.5 pr-8 pl-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(person: User) => person?.username}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-white/5 bg-slate-900 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{person.username}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
