import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data/products";
import { ProductDetail } from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} — Ligna` : "Product Not Found — Ligna",
    description: product?.description,
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
