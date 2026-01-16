import { useState } from "react";
import "./assets/style.css";
import api from "./api/axiosInstance";

import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const [tempImgUrl, setTempImgUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((preData) => ({ ...preData, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.login(formData);
      const { token, expired } = res.data;
      //設定cookie
      document.cookie = `PAPAYA_KG_TOKEN=${token};expires=${new Date(
        expired
      )};`;
      setIsAuth(true);
      getProducts();
    } catch (error) {
      console.dir(error.response);
      setIsAuth(false);
      alert("登入失敗", error.response?.data.message);
    }
  };
  const checkLogin = async (e) => {
    try {
      // 讀取 Cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("PAPAYA_KG_TOKEN="))
        ?.split("=")[1];
      const res = await api.checkLogin();
      console.log(res.data);
    } catch (error) {
      console.dir(error.response);
    }
  };
  const getProducts = async () => {
    try {
      const res = await api.getProducts();
      setProducts(res.data.products);
    } catch (error) {
      console.dir(error.response);
      alert("取得產品列表失敗", error.response?.data.message);
    }
  };

  // const ProductsPage = () => {
  //   return (
  //     <div className="col-md-6">
  //       <button
  //         className="btn btn-danger mb-5"
  //         type="button"
  //         onClick={(e) => checkLogin(e)}
  //       >
  //         確認是否登入
  //       </button>
  //       <h2>產品列表</h2>
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>產品名稱</th>
  //             <th>原價</th>
  //             <th>售價</th>
  //             <th>是否啟用</th>
  //             <th>查看細節</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {products.map((product) => (
  //             <tr key={product.id}>
  //               <td>{product.category}</td>
  //               <td>{product.origin_price}</td>
  //               <td>{product.price}</td>
  //               <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
  //               <td>
  //                 <button
  //                   className="btn btn-primary"
  //                   onClick={() => {
  //                     setTempProduct(product);
  //                     setTempImgUrl(product.imageUrl);
  //                   }}
  //                 >
  //                   查看細節
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };
  // const TempProductPage = () => {
  //   return (
  //     <div className="col-md-6">
  //       <h2>單一產品細節</h2>
  //       {tempProduct ? (
  //         <div className="card mb-3">
  //           <img
  //             src={tempImgUrl}
  //             className="card-img-top primary-image"
  //             alt={tempProduct.title}
  //           />
  //           <div className="card-body">
  //             <h5 className="card-title">
  //               {tempProduct.title}
  //               <span className="badge bg-primary ms-2">
  //                 {tempProduct.category}
  //               </span>
  //             </h5>
  //             <p className="card-text">商品描述：{tempProduct.description}</p>
  //             <p className="card-text">商品內容：{tempProduct.content}</p>
  //             <div className="d-flex">
  //               <p className="card-text text-secondary">
  //                 <del>{tempProduct.origin_price}</del>
  //               </p>
  //               元 / {tempProduct.price} 元
  //             </div>
  //             <h5 className="mt-3">更多圖片：</h5>
  //             <div className="d-flex flex-wrap">
  //               {allImages
  //                 .filter((imgUrl) => imgUrl != tempImgUrl)
  //                 .map((url, index) => (
  //                   <img
  //                     key={index}
  //                     src={url}
  //                     className="img-thumbnail me-2"
  //                     alt={tempProduct.title}
  //                     style={{
  //                       width: "60px",
  //                       height: "60px",
  //                       objectFit: "cover",
  //                       cursor: "pointer",
  //                     }}
  //                     onClick={() => setTempImgUrl(url)}
  //                   />
  //                 ))}
  //             </div>
  //           </div>
  //         </div>
  //       ) : (
  //         <p className="text-secondary">請選擇一個商品查看</p>
  //       )}
  //     </div>
  //   );
  // };

  // return (
  //   <>
  //     {isAuth ? (
  //       <div className="container">
  //         <div className="row mt-5">
  //           <ProductsPage />
  //           <TempProductPage />
  //         </div>
  //       </div>
  //     ) : (
  //       <LoginPage
  //         formData={formData}
  //         handleInputChange={handleInputChange}
  //         handleLogin={handleLogin}
  //       />
  //     )}
  //   </>
  // );
  
  return (
    <>
      {isAuth ? (
        <AdminPage
          products={products}
          tempProduct={tempProduct}
          tempImgUrl={tempImgUrl}
          setTempProduct={setTempProduct}
          setTempImgUrl={setTempImgUrl}
          checkLogin={checkLogin}
        />
      ) : (
        <LoginPage
          formData={formData}
          handleInputChange={handleInputChange}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;
