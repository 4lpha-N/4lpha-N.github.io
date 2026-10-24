import { useParams } from "react-router";
import { GridContainer } from "../katalog/components/layout/Grid/Grid";
import { ProductDetail } from "../katalog/components/product/ProductDetail";
import { products } from "../katalog/components/product/productData";
import NotFound from "./NotFound";

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);
  if (!product) return <NotFound />;

  return (
    <GridContainer>
      <ProductDetail product={product} />
    </GridContainer>
  );
};

export default Product;
