import { DEFAULT_LOCALE, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/constants/seo";
import Head from "expo-router/head";

interface SeoHeadProps {
  title: string
  description: string
  path: string
  image?: string
  locale?: string
  noindex?: boolean
}

export default function SeoHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  locale = DEFAULT_LOCALE,
  noindex = false,
}: SeoHeadProps) {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} | ${SITE_NAME}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
