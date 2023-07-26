import { Suspense } from "react";
import { LikeButton } from "./LikeButton";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchComments = async (postId: string) => {
  // await delay(3000);

  return await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((res) => res.json());
};

async function Comments({ postId }: { postId: string }) {
  const comments = await fetchComments(postId);

  return (
    <ul>
      {comments.map((comment: { id: string; name: string; body: string }) => (
        <li key={comment.id}>
          <details className="open:border open:border-gray-600 open:bg-gray-100 open:text-gray-600 cursor-pointer">
            <summary className="font-bold">{comment.name}</summary>
            <p className="p-4">{comment.body}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
export default async function Post({ params }: { params: { postId: string } }) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  ).then((res) => res.json());

  return (
    <>
      <h1 className="font-bold text-3xl flex gap-2 items-center">
        <span>{post.title}</span>
        <LikeButton postId={params.postId} />
      </h1>

      <p>{post.body}</p>

      <h2 className="font-bold text-2xl">Comments</h2>

      <Suspense fallback="Loading...">
        <Comments postId={params.postId} />
      </Suspense>
    </>
  );
}
