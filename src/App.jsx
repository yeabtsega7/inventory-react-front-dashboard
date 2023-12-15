import "./App.css";
import FlashmessagesComponent from "./Component/FlashmessagesComponent";
import Layout from "./Layout/Layout";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users/Users";
import AddNewUser from "./pages/Users/AddNewUser";
import Editeuser from "./pages/Users/EditeUser";
import Category from "./pages/Category/Category";
import AddNewCategory from "./pages/Category/AddNewCategory";
import EditeCatefory from "./pages/Category/EditeCategory";
import Product from "./pages/Product/Product";
import AddNewProduct from "./pages/Product/AddNewProduct";
import EditeProduct from "./pages/Product/EditeProduct";
import OrdersPage from "./pages/SalesLayout";
import SoldItems from "./pages/Solditems/Solditems";
import Loader from "./Component/Loader";
function App() {
  // eslint-disable-next-line no-empty-pattern
  const { Auth, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FlashmessagesComponent />
      <Routes>
        {Auth.isAuthenticated ? (
          <>
            {JSON.parse(Auth?.user).role === "admin" && (
              <Route path="/admin" element={<Layout />}>
                <Route index element={<div> dashboard</div>} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/users/addnew" element={<AddNewUser />} />
                <Route path="/admin/users/:id/edite" element={<Editeuser />} />
                <Route path="/admin/category" element={<Category />} />
                <Route
                  path="/admin/Category/addnew"
                  element={<AddNewCategory />}
                />
                <Route
                  path="/admin/Category/:id/edite"
                  element={<EditeCatefory />}
                />
                <Route path="/admin/product" element={<Product />} />
                <Route
                  path="/admin/product/addnew"
                  element={<AddNewProduct />}
                />
                <Route
                  path="/admin/product/:id/edite"
                  element={<EditeProduct />}
                />
                <Route path="/admin/solditems" element={<SoldItems />} />

                <Route path="/admin/*" element={<div>404</div>} />
              </Route>
            )}
            <Route path="/*" element={<OrdersPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
