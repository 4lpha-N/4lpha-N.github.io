import { VlTag } from "../atoms/Tag/Tag";
import type { Product } from "./productData";
import "./ProductBadges.scss";

export function ProductBadges({ product }: { product: Product }) {
  if (!product.neu && !product.bestseller) return null;
  return (
    <div className="vl-product__badges">
      {product.neu && (
        <VlTag variant="alt" kind="badge">
          Neu
        </VlTag>
      )}
      {product.bestseller && (
        <VlTag variant="primary" kind="badge">
          Bestseller
        </VlTag>
      )}
    </div>
  );
}
