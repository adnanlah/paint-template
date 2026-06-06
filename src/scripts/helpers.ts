import { createImageUrlBuilder } from '@sanity/image-url'
import type {
    SanityImageCrop,
    SanityImageDimensions,
    SanityImageHotspot,
    SanityImageSource,
} from '@sanity/image-url'
import type { TypedObject } from '@portabletext/types'
import { client } from './sanity-client'

const builder = createImageUrlBuilder(client)
const DEFAULT_IMAGE_QUALITY = 80

export interface SanityImageAssetWithMetadata {
    _id?: string
    url: string
    metadata: {
        dimensions: SanityImageDimensions
    }
}

export interface SanityImageWithMetadata {
    asset: SanityImageAssetWithMetadata
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
}

export type PortableTextValue = TypedObject | TypedObject[]

export interface SlugField {
    current: string
}

export interface ThemeReference {
    title: string
    slug: SlugField
}

export interface ThemeCard {
    title: string
    url: string
    image: {
        source: SanityImageWithMetadata
        height: number
        width: number
    }
}

export interface SlugParam {
    slug: string
}

export interface NestedSlugParam extends SlugParam {
    themeslug: string
}

export interface HighlightedArtworkDocument {
    title: string
    image?: SanityImageWithMetadata
}

export interface ArtworkListDocument {
    title: string
    slug: SlugField
    year: number
    body?: PortableTextValue
    theme: ThemeReference
    image: SanityImageWithMetadata
}

export interface PaintingListDocument extends ArtworkListDocument {
    width: number
    height: number
    medium: string
}

export interface ArtworkDetailDocument extends ArtworkListDocument {
    available?: boolean
}

export interface PaintingDetailDocument extends PaintingListDocument {
    available: boolean
}

export interface InstagramDocument {
    instagram?: string
}

export interface ContactDocument {
    email: string
    instagram?: string
    facebook?: string
    linkedin?: string
    behance?: string
    phone?: string
    contactParagraph1?: string
    contactParagraph2?: string
    contactParagraph3?: string
    contactImage: SanityImageWithMetadata
}

export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}

type Loading = 'eager' | 'lazy'
type FetchPriority = 'auto' | 'high' | 'low'
type ImageDecoding = 'auto' | 'async' | 'sync'

interface ResponsiveSanityImageOptions {
    source: SanityImageSource
    sourceWidth: number
    sourceHeight: number
    widths: number[]
    sizes: string
    quality?: number
    cropSquare?: boolean
    loading?: Loading
    fetchpriority?: FetchPriority
    highResWidth?: number
}

interface ResponsiveSanityImageResult {
    src: string
    srcset: string
    sizes: string
    width: number
    height: number
    loading: Loading
    decoding: ImageDecoding
    fetchpriority: FetchPriority
    highResUrl?: string
}

export function encodeSlug(slug: string) {
    if (slug === '.') return '%2E'
    if (slug === '..') return '%2E%2E'

    return encodeURIComponent(slug)
}

export function decodeSlug(slug: string) {
    try {
        return decodeURIComponent(slug)
    } catch {
        return slug
    }
}

function getCappedWidths(
    widths: number[],
    sourceWidth: number,
    sourceHeight: number,
    cropSquare: boolean,
) {
    const maxWidth = cropSquare
        ? Math.min(sourceWidth, sourceHeight)
        : sourceWidth

    return [...new Set(widths)]
        .filter((width) => width > 0)
        .map((width) => Math.min(width, maxWidth))
        .filter((width) => width > 0)
        .sort((a, b) => a - b)
}

function getImageHeight(
    width: number,
    sourceWidth: number,
    sourceHeight: number,
    cropSquare: boolean,
) {
    if (cropSquare) return width

    return Math.round((sourceHeight / sourceWidth) * width)
}

export function buildSanityImageUrl(
    source: SanityImageSource,
    width: number,
    {
        height,
        quality = DEFAULT_IMAGE_QUALITY,
    }: { height?: number; quality?: number } = {},
) {
    let image = urlFor(source).width(width).format('webp').quality(quality)

    if (height) {
        image = image.height(height).fit('crop')
    }

    return image.url()
}

export function getResponsiveSanityImage({
    source,
    sourceWidth,
    sourceHeight,
    widths,
    sizes,
    quality = DEFAULT_IMAGE_QUALITY,
    cropSquare = false,
    loading = 'lazy',
    fetchpriority = 'auto',
    highResWidth,
}: ResponsiveSanityImageOptions): ResponsiveSanityImageResult {
    const cappedWidths = getCappedWidths(
        widths,
        sourceWidth,
        sourceHeight,
        cropSquare,
    )
    const fallbackWidth = cappedWidths[cappedWidths.length - 1]
    const fallbackHeight = getImageHeight(
        fallbackWidth,
        sourceWidth,
        sourceHeight,
        cropSquare,
    )
    const height = cropSquare ? fallbackWidth : undefined

    return {
        src: buildSanityImageUrl(source, fallbackWidth, { height, quality }),
        srcset: cappedWidths
            .map((width) => {
                const itemHeight = cropSquare ? width : undefined
                const url = buildSanityImageUrl(source, width, {
                    height: itemHeight,
                    quality,
                })

                return `${url} ${width}w`
            })
            .join(', '),
        sizes,
        width: fallbackWidth,
        height: fallbackHeight,
        loading,
        decoding: 'async',
        fetchpriority,
        highResUrl: highResWidth
            ? buildSanityImageUrl(
                  source,
                  Math.min(highResWidth, sourceWidth),
                  { quality },
              )
            : undefined,
    }
}
