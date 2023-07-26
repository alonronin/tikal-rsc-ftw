import { revalidatePath } from "next/cache";

export async function LikeButton({ postId }: { postId: string }) {
  async function updateLike(data: FormData) {
    "use server";

    const postId = Number(data.get("postId"));

    await fetch(`http://localhost:8080/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });

    revalidatePath("/posts/[postId]");
  }

  const likes = await fetch(
    `http://localhost:8080/likes?postId=${postId}`
  ).then((r) => r.json());

  const count = likes.length;

  return (
    <form action={updateLike}>
      <span
        className={`cursor-pointer flex gap-2 font-sm text-base font-normal`}
      >
        <input type="hidden" name="postId" value={postId} />

        <button type="submit" className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${
              count > 0 ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          <span>{count} Likes</span>
        </button>
      </span>
    </form>
  );
}
