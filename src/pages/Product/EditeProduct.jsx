import { useEffect, useState } from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import { useParams } from "react-router-dom";
import useFatchEdite from "../../hooks/useFatchEdite";
import Loader from "../../Component/Loader";
import useFatch from "../../hooks/useFatch";

const EditeProduct = () => {
  const { id } = useParams();
  const { data, loading, edite } = useFatchEdite({
    basurl: `/product/${id}`,
  });
  const catsFeach = useFatch({
    basurl: `/category`,
  });
  const [product, setProduct] = useState({});
  const [cats, setCat] = useState([]);

  useEffect(() => {
    setProduct(data);
  }, [data]);

  useEffect(() => {
    setCat(catsFeach.data);
  }, [catsFeach.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.target);
    const data = Object.fromEntries(formDate);
    edite(data);
  };
  return (
    <>
      <Breadcrumb pageName="Edite Product" />
      <div className="flex flex-col gap-10 h- justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="rounded-sm w-full border border-stroke bg-white shadow-default dark:border-gray-600 dark:bg-gray-700">
            <div className="border-b border-stroke py-4 px-6 dark:border-gray-600">
              <h3 className="font-medium text-black dark:text-white">
                Edite Product Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="mb-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Product name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    defaultValue={product?.name ? product.name : ""}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-5">
                  <div className="mb-4 w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      price
                    </label>
                    <input
                      type="text"
                      name="price"
                      placeholder="Enter Product Price"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      pattern="[0-9]*"
                      onInput={(event) => {
                        event.target.value = event.target.value.replace(
                          /\D/g,
                          ""
                        );
                      }}
                      defaultValue={product?.price ? product.price : ""}
                      onChange={(e) =>
                        setProduct({ ...product, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="Enter Product Quantity"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      pattern="[0-9]*"
                      onInput={(event) => {
                        event.target.value = event.target.value.replace(
                          /\D/g,
                          ""
                        );
                      }}
                      defaultValue={product?.quantity ? product.quantity : ""}
                      onChange={(e) =>
                        setProduct({ ...product, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter Product Description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    defaultValue={
                      product?.description ? product.description : ""
                    }
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  {cats.loading ? (
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                  ) : (
                    <>
                      <select
                        id="countries"
                        name="categoryId"
                        value={product?.categoryId ? product.categoryId : "-1"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            categoryId: e.target.value,
                          })
                        }
                      >
                        <option value="-1">Choose a Category</option>
                        {cats.map((cat) => {
                          return (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          );
                        })}
                      </select>
                    </>
                  )}
                </div>

                {loading ? (
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-blue-700 p-3 font-medium text-gray text-white"
                  >
                    Edite Product
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default EditeProduct;
