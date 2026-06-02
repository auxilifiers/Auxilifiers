import { getPageSeo } from "@/lib/page-seo";

// Server component. Renders the admin-defined custom JSON-LD schema for a
// page (if any). Invalid JSON is ignored so a bad paste can never break the
// page. Drop <PageSeoSchema path="/about" /> anywhere inside a page.
export default async function PageSeoSchema({ path }: { path: string }) {
  const seo = await getPageSeo(path);
  if (!seo.customSchema) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(seo.customSchema);
  } catch {
    return null; // invalid JSON — render nothing rather than break SEO
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(parsed) }}
    />
  );
}
