import { defineField, defineType } from 'sanity'
import { AutoSlugInput } from '../components/AutoSlugInput'

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
        defineField({
            name: 'theme',
            title: 'Theme',
            type: 'reference',
            to: [{ type: 'photographyTheme' }],
            validation: Rule => Rule.required()
        })
    ],
})