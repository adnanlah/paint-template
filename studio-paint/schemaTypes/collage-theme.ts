import { defineField, defineType } from 'sanity'
import { AutoSlugInput } from '../components/AutoSlugInput'

export const collageThemeType = defineType({
    name: 'collageTheme',
    title: 'Collage Theme',
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
            components: { input: AutoSlugInput },
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input: string) =>
                    input
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]+/g, '')
                        .replace(/--+/g, '-'),
            },
            validation: Rule => Rule.required(),
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