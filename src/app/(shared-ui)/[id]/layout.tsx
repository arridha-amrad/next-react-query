import { ReactNode } from "react";

export default function Layout({
  children,
  comments,
}: {
  comments: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="max-w-lg mx-auto pb-10">
      {children}
      {comments}
    </main>
  );
}
