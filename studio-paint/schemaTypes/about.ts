import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'address',
            type: 'string'
        }),
        defineField({
            name: 'phone',
            type: 'string'
        }),
        defineField({
            name: 'telegram',
            type: 'string'
        }),
        defineField({
            name: 'linkedin',
            type: 'string'
        }),
        defineField({
            name: 'instagram',
            type: 'string'
        }),
        defineField({
            name: 'facebook',
            type: 'string'
        }),
        defineField({
            name: 'aboutImage',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'contactImage',
            type: 'image'
        }),
        defineField({
            name: 'photographyMessage',
            type: 'string'
        }),
        defineField({
            name: 'paintingMessage',
            type: 'string'
        }),
        defineField({
            name: 'collageMessage',
            type: 'string'
        }),
        defineField({
            name: 'aboutText',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})