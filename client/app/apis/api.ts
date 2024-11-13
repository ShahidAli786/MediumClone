import { client } from "@/lib/sanity";
import ImageUrlBuilder from "@sanity/image-url";

function generateUniqueKey() {
  return `${Math.random().toString(36).substr(2, 9)}-${new Date().getTime()}`;
}
async function likePost(postId: string, userId: string) {
  const timestamp = new Date().toISOString();
  const uniqueKey = generateUniqueKey();

  try {
    await client
      .patch(postId)
      .setIfMissing({ likes: [] })
      .insert("after", "likes[-1]", [
        { _key: uniqueKey, user: { _ref: userId }, timestamp },
      ])
      .commit();
    console.log("Post liked successfully");
  } catch (error) {
    console.error("Error liking post:", error);
  }
}

async function unlikePost(postId: string, userId: string) {
  try {
    const post = await client.getDocument(postId);
    const updatedLikes = post?.likes.filter(
      (like: any) => like.user._ref !== userId
    );

    await client.patch(postId).set({ likes: updatedLikes }).commit();
    console.log("Post unliked successfully");
  } catch (error) {
    console.error("Error unliking post:", error);
  }
}

export const likeOrUnlikePost = async (
  postId: string,
  isCurrentlyLiked: boolean,
  userId: string | null
) => {
  try {
    if (!userId) {
      console.error("User ID is required.");
      return;
    }

    if (isCurrentlyLiked) {
      // If the post is currently liked, remove the user's reference (unlike)
      await unlikePost(postId, userId);
      console.log("Post unliked!");
    } else {
      // If the post is not liked, add the user's reference to the likes array (like)
      await likePost(postId, userId);
      console.log("Post liked!");
    }
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

async function bookmarkPost(postId: string, userId: string) {
  const timestamp = new Date().toISOString();
  const uniqueKey = generateUniqueKey();

  try {
    await client
      .patch(postId)
      .setIfMissing({ bookmarks: [] })
      .insert("after", "bookmarks[-1]", [
        { _key: uniqueKey, user: { _ref: userId }, timestamp },
      ])
      .commit();
    console.log("Post bookmarked successfully");
  } catch (error) {
    console.error("Error bookmarking post:", error);
  }
}

// Function to remove a bookmark
async function unbookmarkPost(postId: string, userId: string) {
  try {
    const post: any = await client.getDocument(postId);
    const updatedBookmarks = post.bookmarks.filter(
      (bookmark: any) => bookmark.user._ref !== userId
    );

    await client.patch(postId).set({ bookmarks: updatedBookmarks }).commit();
    console.log("Post unbookmarked successfully");
  } catch (error) {
    console.error("Error unbookmarking post:", error);
  }
}
export const bookmarksOrUnbookmarkPost = async (
  postId: string,
  isCurrentlyBookmarked: boolean,
  userId: string | null
) => {
  try {
    if (!userId) {
      console.error("User ID is required.");
      return;
    }

    if (isCurrentlyBookmarked) {
      // If the post is currently bookmarked, remove the user's reference from the bookmarks array (unbookmark)
      await unbookmarkPost(postId, userId);
      console.log("Post unbookmarked!");
    } else {
      // If the post is not bookmarked, add the user's reference to the bookmarks array (bookmark)
      await bookmarkPost(postId, userId);
      console.log("Post bookmarked!");
    }
  } catch (error) {
    console.error("Error updating bookmark status:", error);
  }
};

export const fetchPostApi = async (userId: string | null) => {
  try {
    const data = await client.fetch(`
            *[_type == "post"] | order(_createdAt desc){
                _id,
                title,
                author->{
                    name,
                    username,
                    image,
                    bio
                },
                likes,
                bookmarks,
                postcontent,
                "isBookmarked": bookmarks[user._ref == "${userId}"][0] != null,
                "isLiked": likes[user._ref == "${userId}"][0] != null,
                category,
                image,
                _createdAt
            }
            `);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookmarkPost = async (userId: string | null) => {
  try {
    const data = await client.fetch(
      `*[_type == "post" && bookmarks[user._ref == $userId][0]!=null]{
              _id,
              title,
              author->{
                name,
                username,
                image,
                bio
              },
              likes,
              bookmarks,
              postcontent,
              "isBookmarked": bookmarks[user._ref == $userId][0] != null,
              "isLiked": likes[user._ref == $userId][0] != null,
              category,
              image,
              _createdAt
            }
          `,
      {
        userId,
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching bookmarked posts:", error);
  }
};

export const fetchUserPost = async (userId: string | null) => {
  try {
    const data = await client.fetch(
      `*[_type == "post" && author._ref == $userId]{
              _id,
              title,
              author->{
                name,
                username,
                image,
                bio
              },
              likes,
              bookmarks,
              postcontent,
              "isBookmarked": bookmarks[user._ref == $userId][0] != null,
              "isLiked": likes[user._ref == $userId][0] != null,
              category,
              image,
              _createdAt
            }
          `,
      {
        userId,
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
};
// search post beased on title, category and author

export const searchPost = async (searchTerm: string, userId: string | null) => {
  try {
    const data = await client.fetch(
      `*[_type == "post" && (title match $searchTerm || category match $searchTerm || author->name match $searchTerm)]{
              _id,
              title,
              author->{
                name,
                username,
                image,
                bio
              },
              likes,
              bookmarks,
              postcontent,
              "isBookmarked": bookmarks[user._ref == $userId][0] != null,
              "isLiked": likes[user._ref == $userId][0] != null,
              category,
              image,
              _createdAt
            }
          `,
      {
        searchTerm,
        userId,
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
};

const builder = ImageUrlBuilder(client);

// Helper function to generate image URLs
function urlFor(source: any) {
  return builder.image(source);
}

// Function to upload image and update the author’s image URL
export async function uploadAuthorImage(authorId: string, file: any) {
  try {
    // Step 1: Upload the image to Sanity
    console.log(file);
    const imageAsset = await client.assets.upload("image", file, {
      filename: "image",
    });
    console.log("Image uploaded successfully:", imageAsset);

    // Step 2: Get the URL of the uploaded image
    const imageUrl = urlFor(imageAsset).url();
    // Step 3: Update the author's document with the image URL
    await client.patch(authorId).set({ image: imageUrl }).commit();

    console.log("Image uploaded and author updated successfully:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image or updating author:", error);
    throw error;
  }
}

// edit profile api
export async function editProfileApi(authorId: string, data: any) {
  try {
    const result = await client
      .patch(authorId)
      .set({
        name: data.name,
        bio: data.bio,
      })
      .commit();

    console.log("Profile updated successfully");
    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}
