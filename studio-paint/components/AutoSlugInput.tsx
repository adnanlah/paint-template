import { useEffect } from 'react'
import { set, useFormValue, ObjectInputProps, SlugValue, SlugSchemaType } from 'sanity'
import { SlugInput } from 'sanity'

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
}

export function AutoSlugInput(props: ObjectInputProps<SlugValue, SlugSchemaType>) {
    const title = useFormValue(['title']) as string | undefined

    useEffect(() => {
        if (!title) return
        const currentSlug = props.value?.current
        const generatedSlug = slugify(title)

        if (currentSlug !== generatedSlug) {
            props.onChange(
                set({ _type: 'slug', current: generatedSlug })
            )
        }
    }, [title])

    return <SlugInput {...props} />
}
