import { defineField, defineType } from 'sanity'

export const paintingThemeType = defineType({
    name: 'paintingTheme',
    title: 'Painting Theme',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' }
        }),
        defineField({
            name: 'body',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
    ],
})