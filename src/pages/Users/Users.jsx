import Breadcrumb from "../../Component/Breadcrumb";
import Loader from "../../Component/Loader";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import useFatch from "../../hooks/useFatch";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import DeletePopUp from "../../Component/DeletePopUp";

const Users = () => {
  const { data, loading, remove } = useFatch({ basurl: "/user" });
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteId, setDeleteId] = useState("");
  return (
    <>
      {showDelete && (
        <DeletePopUp
          item={deleteTitle}
          setShow={setShowDelete}
          action={() => {
            remove(deleteId);
          }}
        />
      )}
      <Breadcrumb pageName="users" />
      <div className="flex flex-col gap-10 h- justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="rounded-sm w-full border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-200 dark:bg-gray-700 sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <div className=" flex justify-between items-center mb-6">
                <h4 className=" text-xl font-semibold text-black dark:text-white">
                  Users Table
                </h4>
                <NavLink to={"/users/addnew"}>
                  <button className="inline-flex items-center bg-blue-800 justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Add New
                  </button>
                </NavLink>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left bg-gray-100 dark:bg-slate-600">
                    <th className="min-w-[220px] py-4 pl-5 font-medium text-black dark:text-white xl:pl-11">
                      Name
                    </th>
                    <th className="min-w-[150px] py-4  font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="min-w-[120px] py-4  font-medium text-black dark:text-white">
                      Role
                    </th>
                    <th className="py-4  font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td className="border-b border-[#eee] py-5 pl-5  dark:border-gray-500 xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {user.name}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5  dark:border-gray-500">
                          <p className="text-black dark:text-white">
                            {user.email}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5  dark:border-gray-500">
                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                            {user.role}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 dark:border-gray-500">
                          <div className="flex items-center space-x-3.5 text-[2rem]">
                            <Link to={`/users/${user.id}/edite`}>
                              <button className="hover:text-primary text-blue-800">
                                <FaUserEdit />
                              </button>
                            </Link>

                            <button
                              onClick={() => {
                                setDeleteTitle("user " + user.name);
                                setDeleteId(user.id);
                                setShowDelete(true);
                              }}
                              className="hover:text-primary text-red-600"
                            >
                              <TiUserDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
