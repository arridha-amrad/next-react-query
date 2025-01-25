import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";

export default function Date({ createdAt }: { createdAt: Date }) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return <p className="animate-pulse text-slate-500">...</p>;
  return (
    <p className="text-slate-500 text-sm">
      {formatDistanceToNowStrict(createdAt)}
    </p>
  );
}
