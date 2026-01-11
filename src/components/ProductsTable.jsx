export default function ProductsTable({ products, onSelectProduct, checkLogin }) {
  return (
    <div className="col-md-6">
      <button
        className="btn btn-danger mb-5"
        type="button"
        onClick={(e) => checkLogin(e)}
      >
        確認是否登入
      </button>
      <h2>產品列表</h2>
      <table className="table">
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>查看細節</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.category}</td>
              <td>{product.origin_price}</td>
              <td>{product.price}</td>
              <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => onSelectProduct(product)}
                >
                  查看細節
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
