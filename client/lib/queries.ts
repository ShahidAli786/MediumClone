export const AUTHOR_BY_ID_QUERY = `
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `;

export const FETCH_POSTS = `
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
        
        category,
        image,
        _createdAt
    }
    `;
