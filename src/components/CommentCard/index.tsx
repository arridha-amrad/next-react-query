import { Comment } from "@/api/comments";
import { UserIcon } from "@heroicons/react/16/solid";
import Date from "../Date";

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  return (
    <div className="flex items-start gap-2">
      <UserIcon className="w-7 p-1 border border-slate-700 rounded-full" />
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-2">
          <h1 className="text-sm">{comment.user?.username}</h1>
          <span className="">&middot;</span>
          <Date createdAt={comment.createdAt} />
        </span>
        <div>
          <p className="text-sm tracking-tight">{comment.body}</p>
        </div>
      </div>
    </div>
  );
}
