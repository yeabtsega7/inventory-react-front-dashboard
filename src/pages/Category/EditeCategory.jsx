import { useEffect, useState } from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import { useParams } from "react-router-dom";
import useFatchEdite from "../../hooks/useFatchEdite";
import Loader from "../../Component/Loader";

const EditeCatefory = () => {
  const { id } = useParams();
  const { data, loading, edite } = useFatchEdite({
    basurl: `/category/${id}`,
  });
  const [category, setCategory] = useState({});

  useEffect(() => {
    setCategory(data);
    console.log(data);
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.target);
    const data = Object.fromEntries(formDate);
    console.log(data);
    edite(data);
  };
  return (
    <>
      <Breadcrumb pageName="Edite Category" />
      <div className="flex flex-col gap-10 h- justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="rounded-sm w-full border border-stroke bg-white shadow-default dark:border-gray-600 dark:bg-gray-700">
            <div className="border-b border-stroke py-4 px-6 dark:border-gray-600">
              <h3 className="font-medium text-black dark:text-white">
                Edite Category Form
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
                    placeholder="Enter your full name"
                    value={`${category?.name ? category.name : ""}`}
                    onChange={(e) => {
                      setCategory({ ...category, name: e.target.value });
                    }}
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
                    Edite User
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

export default EditeCatefory;
