import { useState } from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import { instance } from "../../lib/Axios";
import useFlashmessage from "../../hooks/useFlashmessage";
import { useNavigate } from "react-router-dom";

const AddNewUser = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setFlashmessage } = useFlashmessage();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.target);
    formDate.append("role", enabled ? "admin" : "sale");
    const data = Object.fromEntries(formDate);
    if (data.name === "" || data.email === "" || data.password === "") {
      setFlashmessage("All fildes are required", true);
      return;
    } else {
      setLoading(true);
      instance
        .post("/user", data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setFlashmessage("User added successfully", false);
            navigate("/admin/users");
          } else {
            setFlashmessage(res.data.message, true);
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
      <Breadcrumb pageName="Add User" />
      <div className="flex flex-col gap-10 h- justify-center items-center">
        <div className="rounded-sm w-full border border-stroke bg-white shadow-default dark:border-gray-600 dark:bg-gray-700">
          <div className="border-b border-stroke py-4 px-6 dark:border-gray-600">
            <h3 className="font-medium text-black dark:text-white">
              Add User Form
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="flex items-center mb-4 gap-5">
                Role:
                <label
                  htmlFor="toggle3"
                  className="flex cursor-pointer select-none items-center "
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="toggle3"
                      name="role"
                      className="sr-only"
                      onChange={() => {
                        setEnabled(!enabled);
                      }}
                    />
                    <div className="block h-8 w-14 rounded-full bg-gray-300 dark:bg-[#5A616B]"></div>
                    <div
                      className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                        enabled &&
                        "!right-1 !translate-x-full !bg-blue-700 dark:!bg-white"
                      }`}
                    >
                      <span className={`hidden ${enabled && "!block"}`}>
                        <svg
                          className="fill-white dark:fill-black"
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill=""
                            stroke=""
                            strokeWidth="0.4"
                          ></path>
                        </svg>
                      </span>
                      <span className={`${enabled && "hidden"}`}>
                        <svg
                          className="h-4 w-4 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </label>
              </div>
              {loading ? (
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-blue-700 p-3 font-medium text-gray text-white"
                >
                  Add User
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
