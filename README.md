## Didit

~~Upvote~~ Didit is a Reddit-esque web application that allows users to create posts, upvote and downvote posts, and comment on posts in a multi-threaded, nested list.

The project is built using Next.js with the /app router and [Tailwind CSS](https://tailwindcss.com/), and uses [Auth.js (formerly Next Auth)](https://authjs.dev/) for user authentication. The data is stored in a Postgres database, which is created and accessed with raw SQL queries using the `pg` package.

The project is a work in progress and is not yet complete.

## Features

- [x] View a list of posts
- [x] View a single post
- [x] Create a post
- [x] Upvote and downvote posts
- [x] Pagination of posts
- [x] Comment on posts
- [x] Nested comments (recursive lists)
- [x] User authentication

### Debug assignment

Getting the project deployed was quite straightforward, there were some issues rooted in the SQL schema but those were easily resolved.

I tested all of the core features to make sure they all function accordingly and I couldn't detect any problems.

### Stretch goals:

I attempted to tackle the stretch goals but in separate branches (which I deployed in vercel), though I didn't have success getting those functioning. Firstly I tried to tackle the potential feature of sorting posts by different types by both ASC and DESC, and this didn't work as I'd expected. Debugging with Vercel wasn't greatly helpful as it didn't really provide much detailed error information, only that the PostList.jsx failed to render (wasn't more specific than that).

In doing this, I see that SQL queries can potentially be used to handle much more complex sorting and it does give me inspiration for the things I can do later down the line. In my week-08 or 9 assignment I used a much more convoluted way to sort messages and in retrospect it could be better to do this directly with a more customized SQL query.

If you check my repo on Github, you'll might see what I attempted to do with the sorting posts branch.

Don't have much more feedback on this assignment than that.

## Thanks for reading!
