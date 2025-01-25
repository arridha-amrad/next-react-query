"use client";

import { Post } from "@/api/posts";

type Props = {
  post: Post;
};

export default function PostLovers({ post }: Props) {
  const users = post.lovers ? post.lovers.map((user) => user.username) : [];

  if (users.length === 1) {
    return <span>{users[0]} liked this post</span>;
  }
  if (users.length === 2) {
    return (
      <span>
        {users[0]} and {users[1]} liked this post
      </span>
    );
  }
  if (users.length === 3) {
    return (
      <span>
        {users[0]}, {users[1]} and {users[2]} liked this post
      </span>
    );
  }
  return (
    <span>
      {users[0]}, {users[1]}, {users[2]} and others liked this post
    </span>
  );
}
