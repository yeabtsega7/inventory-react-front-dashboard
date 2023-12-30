import { useState } from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import { instance } from "../../lib/Axios";
import useFlashmessage from "../../hooks/useFlashmessage";
import { useLocation } from "react-router-dom";

const AddNewCategory = () => {
  const [loading, setLoading] = useState(false);
  const { setFlashmessage } = useFlashmessage();

  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.target);
    const data = Object.fromEntries(formDate);
    if (data.name === "") {
      setFlashmessage("All fildes are required", true);
      return;
    } else {
      setLoading(true);
      instance
        .post("/category", data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setFlashmessage("Category added successfully", false);
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
      <Breadcrumb pageName="Add Category" />
      <div className="flex flex-col gap-10 h- justify-center items-center">
        <div className="rounded-sm w-full border border-stroke bg-white shadow-default dark:border-gray-600 dark:bg-gray-700">
          <div className="border-b border-stroke py-4 px-6 dark:border-gray-600">
            <h3 className="font-medium text-black dark:text-white">
              Add Category Form
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
                  placeholder="Enter Category name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              {loading ? (
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-blue-700 p-3 font-medium text-gray text-white"
                >
                  Add Category
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewCategory;
