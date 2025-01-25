import { wait, waiting } from "@/utils";
import { getUserById, User } from "./users";

export type Comment = {
  body: string;
  userId: string;
  createdAt: Date;
  id: string;
  postId: string;
  // populate
  user?: User;
};

const URL = "http://localhost:3001/comments";

const populate = async (comment: Comment) => {
  const user = await getUserById(comment.userId);
  if (user) {
    comment = {
      ...comment,
      user,
    };
  }
  return comment;
};

export const getComments = async (postId: string): Promise<Comment[]> => {
  await wait(waiting());
  const response = await fetch(`${URL}?postId=${postId}`);
  const comments = (await response.json()) as Comment[];
  comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const promises = comments.map(async (c) => await populate(c));
  const populatedComments = await Promise.all(promises);
  return populatedComments;
};

type TCreateComment = {
  body: string;
  userId: string;
  postId: string;
};
export const createComment = async ({
  body,
  postId,
  userId,
}: TCreateComment) => {
  await wait(waiting());
  const response = await fetch(`${URL}`, {
    method: "POST",
    body: JSON.stringify({
      body,
      userId,
      postId,
      createdAt: new Date(),
    }),
  });
  const data = (await response.json()) as Comment;
  const comment = await populate(data);
  return comment;
};
