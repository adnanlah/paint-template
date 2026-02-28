import { defineField, defineType } from 'sanity'

export const paintingType = defineType({
    name: 'painting',
    title: 'Painting',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'medium',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'year',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'width',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'height',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'available',
            type: 'boolean',
            initialValue: true,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'highlighted',
            type: 'boolean',
            initialValue: false,
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
            name: 'theme',
            title: 'Theme',
            type: 'reference',
            to: [{ type: 'paintingTheme' }],
            validation: Rule => Rule.required()
        })
    ],
    groups: []
})