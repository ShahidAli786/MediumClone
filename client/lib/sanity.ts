import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "m10so34o",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2024-11-09", // use current date (YYYY-MM-DD) to target the latest API version
  token:
    "sk6OA5hsfc9OkwkuZfOCl9zpBh6M7rkf7lx2OP7v7zml2cMscVWyyQ6wr3YPfirS5cZ5Bko3GZOurqAySHkjqCOsiPOLNYqz6mqWr0lX6tVdEFrqP05LSVlrvTkrHdXS8RuUtibGIXUIBBos7rxSxqwVDZ9v1Znf9ZvjcJKn2k3cZEaTzAty",

  // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content or accessing previewDrafts perspective
});

export const writeClient = createClient({
  projectId: "m10so34o",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2024-11-09",
  token:
    "sk6OA5hsfc9OkwkuZfOCl9zpBh6M7rkf7lx2OP7v7zml2cMscVWyyQ6wr3YPfirS5cZ5Bko3GZOurqAySHkjqCOsiPOLNYqz6mqWr0lX6tVdEFrqP05LSVlrvTkrHdXS8RuUtibGIXUIBBos7rxSxqwVDZ9v1Znf9ZvjcJKn2k3cZEaTzAty",
});

if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}
