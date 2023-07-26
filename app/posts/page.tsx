import Link from "next/link";

export default async function Posts() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );

  console.log("posts", posts);

  return (
    <>
      <h1 className="text-3xl font-bold">Posts</h1>

      <ul className="flex flex-col gap-4">
        {posts.map((post: { id: string; title: string }) => (
          <li key={post.id}>
            <h2 className="font-bold text-blue-500">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
          </li>
        ))}
      </ul>
    </>
  );
}
