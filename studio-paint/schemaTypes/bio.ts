import { defineField, defineType } from 'sanity'

export const bioType = defineType({
    name: 'bio',
    title: 'Bio',
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
            name: 'instagram',
            type: 'string'
        }),
        defineField({
            name: 'facebook',
            type: 'string'
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
    ],
})