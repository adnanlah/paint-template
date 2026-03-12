import { defineField, defineType } from 'sanity'

export const collectionType = defineType({
    name: 'collection',
    title: 'Collection',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Display Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'file',
            title: 'PDF File',
            type: 'file',
            validation: (rule) => rule.required(),
        }),
    ],
})
