import { Post } from "@/api/posts";
import { useLikePost } from "@/hooks/rq/mutations/useLikePost";
import { useAuth } from "@/hooks/rq/queries/useAuth";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Heart } from "@heroicons/react/24/solid";

type Props = {
  post: Post;
};

export default function ButtonLike({ post }: Props) {
  const me = useAuth();
  const isLiked = !me ? false : !!post.likers.find((uid) => uid === me.id);

  const { mutate } = useLikePost(post.id);

  const like = async () => {
    if (!me) {
      return alert("Please pick a user at navbar");
    }
    mutate(me.id);
  };

  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        await like();
      }}
    >
      {isLiked ? (
        <Heart className="w-6 fill-pink-600" />
      ) : (
        <HeartIcon className="w-6" />
      )}
    </button>
  );
}
