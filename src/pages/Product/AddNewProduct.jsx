import { useEffect, useState } from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import { instance } from "../../lib/Axios";
import useFlashmessage from "../../hooks/useFlashmessage";
import { useLocation } from "react-router-dom";

const AddNewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(true);
  const [catData, setCatData] = useState([]);
  const { setFlashmessage } = useFlashmessage();

  const location = useLocation();
  useEffect(() => {
    instance
      .get("/category", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCatData(res.data);
          setCatLoading(false);
        } else {
          setFlashmessage(res.data.message, true);
        }
      })
      .catch((err) => {
        console.log(err);
        setFlashmessage(err.response.data.message, true);
        setCatLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.target);
    const data = Object.fromEntries(formDate);
    if (
      data.name === "" ||
      data.price === "" ||
      data.quantity === "" ||
      data.description === "" ||
      data.category === ""
    ) {
      setFlashmessage("All fildes are required", true);
      return;
    } else {
      setLoading(true);
      instance
        .post("/product", data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setFlashmessage("Product added successfully", false);
            location.pathname = "/users";
          } else {
            setFlashmessage(res.data.message, false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setFlashmessage(err.response.data.message, true);
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Breadcrumb pageName="Add Product" />
      <div className="flex flex-col gap-10 h- justify-center items-center">
        <div className="rounded-sm w-full border border-stroke bg-white shadow-default dark:border-gray-600 dark:bg-gray-700">
          <div className="border-b border-stroke py-4 px-6 dark:border-gray-600">
            <h3 className="font-medium text-black dark:text-white">
              Add Product Form
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
                />
              </div>
              <div className="mb-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                {catLoading ? (
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                ) : (
                  <select
                    id="countries"
                    name="categoryId"
                    defaultValue="choose"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="choose">Choose a Category</option>
                    {catData.map((cat) => {
                      return (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>

              {loading ? (
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-blue-700 p-3 font-medium text-gray text-white"
                >
                  Add Product
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
