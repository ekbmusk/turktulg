import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_LOCALE, abs } from './config.js'

// Әмбебап SEO компоненті: title, description, canonical, Open Graph,
// Twitter card және JSON-LD құрылымдық деректер.
export default function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  keywords,
  jsonLd,
}) {
  const url = abs(path)
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const ogImage = image ? abs(image) : undefined

  return (
    <Helmet prioritizeSeoTags>
      <html lang="kk" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
