import { wait, waiting } from "@/utils";

const USERS_URL = "http://localhost:3001/users";

export type User = {
  id: string;
  username: string;
};

export const getUsers = async (): Promise<User[]> => {
  await wait(waiting());
  const response = await fetch(USERS_URL);
  return response.json();
};

export const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  console.log("run...");

  const promises = ids.map(async (id) => {
    const response = await fetch(`${USERS_URL}/${id}`);
    const data = (await response.json()) as User;
    return data;
  });
  const users = await Promise.all(promises);
  console.log("still run...");
  return users;
};

export const createUser = async (username: string): Promise<User> => {
  await wait(waiting());
  const res1 = await fetch(USERS_URL, {
    method: "POST",
    body: JSON.stringify({ username }),
  });
  return res1.json();
};

export const removeUser = async (id: string) => {
  await wait(waiting());
  const response = await fetch(`${USERS_URL}/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const response = await fetch(`${USERS_URL}/${id}`);
  const data = await response.json();
  return data;
};
