import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/constants/seo";
import Head from "expo-router/head";

export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    email: "info@dreamsportsinternational.com",
    sameAs: ["https://www.instagram.com/dreamsportsinternational/"],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Calle 1C #52A-05",
        addressLocality: "Bogotá D.C.",
        addressCountry: "CO",
      },
      {
        "@type": "PostalAddress",
        addressCountry: "IT",
      },
    ],
  }

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  )
}
