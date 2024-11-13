import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'author',
      type: 'reference',
      to: {
        type: 'author',
      },
    }),

    defineField({
      name: 'postcontent',
      type: 'text',
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (Rule) => Rule.min(1).max(20).required().error('Category is required'),
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'bookmarks',
      type: 'array',
      title: 'Bookmarked By',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'user', type: 'reference', to: {type: 'author'}},
            {name: 'timestamp', type: 'datetime'},
          ],
        },
      ],
      description: 'List of users who bookmarked this post',
    }),
    defineField({
      name: 'likes',
      type: 'array',
      title: 'Liked By',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'user', type: 'reference', to: {type: 'author'}},
            {name: 'timestamp', type: 'datetime'},
          ],
        },
      ],
      description: 'List of users who liked this post',
    }),
  ],
})
