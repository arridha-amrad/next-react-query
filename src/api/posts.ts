import { wait, waiting } from "@/utils";
import { getUserById, User } from "./users";

export type Post = {
  id: string;
  body: string;
  createdAt: Date;
  userId: string;
  likers: string[];
  // populated
  lovers?: User[];
  user?: User;
};

const URL = "http://localhost:3001/posts";

const populatePost = async (post: Post) => {
  const user = await getUserById(post.userId);
  if (user) {
    post = {
      ...post,
      user,
    };
  }
  const promises = post.likers.map(async (uid) => {
    const user = await getUserById(uid);
    return user;
  });
  const lovers = await Promise.all(promises);
  post = {
    ...post,
    lovers: lovers.filter((l) => l !== null),
  };
  return post;
};

export const getPostById = async (
  id: string,
  isPopulate = false
): Promise<Post | null> => {
  const response = await fetch(`${URL}/${id}`);
  const post = (await response.json()) as Post;
  if (!post) return null;
  if (isPopulate) {
    const postDetail = populatePost(post);
    return postDetail;
  } else {
    return post;
  }
};

export const likePost = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}): Promise<Post | null> => {
  const post = await getPostById(id);
  if (!post) return null;
  let { likers } = post;
  const isLiked = likers.find((uid) => uid === userId);
  if (isLiked) {
    likers = likers.filter((uid) => uid !== userId);
  } else {
    likers = [...likers, userId];
  }
  const updatePost = await fetch(`${URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...post,
      likers,
    }),
  });
  return updatePost.json();
};

export const getPosts = async (): Promise<Post[]> => {
  await wait(waiting());
  const response = await fetch(`${URL}?_sort=createdAt`);
  const data = (await response.json()) as Post[];
  data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const promises = data.map(async (post) => populatePost(post));
  const posts = await Promise.all(promises);
  return posts;
};

export const createPost = async ({
  body,
  userId,
}: {
  body: string;
  userId: string;
}): Promise<Post> => {
  await wait(waiting());
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      userId,
      body,
      likers: [],
      createdAt: new Date(),
    }),
  });
  return response.json();
};
