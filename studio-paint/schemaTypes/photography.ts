import { defineField, defineType } from 'sanity'

export const photographyType = defineType({
    name: 'photography',
    title: 'Photography',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'year',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: (doc) => `${doc.title}-${doc.year}`,
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'body',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'highlighted',
            type: 'boolean',
            initialValue: false,
            validation: (rule) => rule.required(),
        }),
    ],
})