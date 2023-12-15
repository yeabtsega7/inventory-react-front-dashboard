import { useState } from "react";
import Header from "../Component/Header";
import SidebarOrders from "../Component/SidebarOrders";
import { IoMdAdd } from "react-icons/io";
import useOrder from "../hooks/useOrder";

const OrdersPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, addOrder, incOrder, decOrder, deleteOrder, order, buy } =
    useOrder({
      basurl: "/product",
    });

  return (
    <div className="dark:bg-slate-800 dark:text-gray-100">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SidebarOrders
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          order={{ order, incOrder, decOrder, deleteOrder, buy }}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className=" h-full">
            <div className="mx-auto h-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="rounded-sm w-full border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-200 dark:bg-gray-700 sm:px-7.5 xl:pb-1">
                <div className="max-w-full ">
                  <div className=" flex justify-between items-center mb-6">
                    <h4 className=" text-xl font-semibold text-black dark:text-white">
                      Products Table
                    </h4>
                  </div>
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto  ">
                      <thead>
                        <tr className="bg-gray-2 text-left bg-gray-100 dark:bg-slate-600">
                          <th className="min-w-[220px] py-4 pl-5 font-medium text-black dark:text-white xl:pl-11">
                            Name
                          </th>
                          <th className="min-w-[220px] py-4  font-medium text-black dark:text-white xl:pl-11">
                            Price
                          </th>

                          <th className="min-w-[220px] py-4  font-medium text-black dark:text-white xl:pl-11">
                            quantity
                          </th>

                          <th className="py-4  font-medium text-black dark:text-white">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((product) => {
                          return (
                            <tr key={product.id}>
                              <td className="border-b border-[#eee] py-5 pl-5  dark:border-gray-500 xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {product.name}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] py-5   dark:border-gray-500 xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {product.price}
                                </h5>
                              </td>

                              <td className="border-b border-[#eee] py-5   dark:border-gray-500 xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {product.quantity}
                                </h5>
                              </td>

                              <td className="border-b border-[#eee] py-5 dark:border-gray-500">
                                <button
                                  onClick={() => {
                                    addOrder({ product });
                                  }}
                                  className="flex items-center space-x-3.5"
                                >
                                  <div className="flex items-center space-x-3.5 text-[1.7rem]">
                                    <IoMdAdd />
                                  </div>
                                  Order
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default OrdersPage;
