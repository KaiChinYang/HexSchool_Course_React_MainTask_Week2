import ProductsTable from "../components/ProductsTable";
import ProductDetail from "../components/ProductDetail";

export default function AdminPage({
  products,
  tempProduct,
  tempImgUrl,
  setTempProduct,
  setTempImgUrl,
}) {
  return (
    <div className="container">
      <div className="row mt-5">
        <ProductsTable
          products={products}
          onSelectProduct={(product) => {
            setTempProduct(product);
            setTempImgUrl(product.imageUrl);
          }}
        />
        <ProductDetail
          product={tempProduct}
          tempImgUrl={tempImgUrl}
          setTempImgUrl={setTempImgUrl}
        />
      </div>
    </div>
  );
}
