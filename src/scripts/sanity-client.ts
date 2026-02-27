import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'qi3xtlxb',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: true
})