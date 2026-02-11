import Link from "next/link";
import { Pagination } from "./Pagination";
import { Vote } from "./Vote";
import { db } from "@/db";
import { POSTS_PER_PAGE } from "@/config";

//! searchParams was one of my edits. Remove it if things go awry
export async function PostList({ currentPage = 1, searchParams }) {
  const voteTotal = "vote_total";
  const sortOrder = "didit_posts.id";
  // Default ordering criteria
  let orderBy = "didit_posts.id";
  let sortDir = "DESC";

  const searchOrder = await searchParams;
  const { rows: posts } =
    await db.query(`SELECT didit_posts.id, didit_posts.title, didit_posts.body, didit_posts.created_at, users.name, 
    COALESCE(SUM(votes.vote), 0) AS vote_total
     FROM didit_posts
     JOIN users ON didit_posts.user_id = users.id
     LEFT JOIN votes ON votes.post_id = didit_posts.id
     GROUP BY didit_posts.id, users.name
     ORDER BY ${orderBy} ${sortDir}
     LIMIT ${POSTS_PER_PAGE}
     OFFSET ${POSTS_PER_PAGE * (currentPage - 1)}`);

  //! Shaun Church's original query
  // const { rows: posts } =
  //   await db.query(`SELECT didit_posts.id, didit_posts.title, didit_posts.body, didit_posts.created_at, users.name,
  //   COALESCE(SUM(votes.vote), 0) AS vote_total
  //    FROM didit_posts
  //    JOIN users ON didit_posts.user_id = users.id
  //    LEFT JOIN votes ON votes.post_id = didit_posts.id
  //    GROUP BY didit_posts.id, users.name
  //    ORDER BY vote_total DESC
  //    LIMIT ${POSTS_PER_PAGE}
  //    OFFSET ${POSTS_PER_PAGE * (currentPage - 1)}`);

  if (searchOrder.sort === "desc") {
    posts.rows.sort((a, b) => {
      return b.id - a.id;
    });
  } else if (posts.sort === "asc") {
    posts.rows.sort((a, b) => {
      return a.id - b.id;
    });
  } else if (searchOrder.sort === "votedesc") {
    orderBy = "vote_total";
    sortDir = "DESC";
  } else if (searchOrder.sort === "voteasc") {
    orderBy = "vote_total";
    sortDir = "ASC";
  }

  return (
    <>
      <div>
        <Link href={`/?sort=asc`}>Oldest to Latest</Link>
        <Link href={`/?sort=desc`}>Latest to Oldest</Link>
        <Link href={`/?sort=votedesc`}>Most votes</Link>
        <Link href={`/?sort=votedesc`}>Least votes</Link>
      </div>
      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className=" py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg"
          >
            <Vote postId={post.id} votes={post.vote_total} />
            <div>
              <Link
                href={`/post/${post.id}`}
                className="text-3xl hover:text-pink-500"
              >
                {post.title}
              </Link>
              <p className="text-zinc-700">posted by {post.name}</p>
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} />
    </>
  );
}
