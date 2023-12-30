import { useEffect, useState } from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import Loader from "../../Component/Loader";
import useFatch from "../../hooks/useFatch";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const SoldItems = () => {
  const [date, setDate] = useState("");
  const { data, loading, reload } = useFatch({
    basurl: "/sale",
    params: { date: new Date().toISOString().split("T")[0] },
  });
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);
  return (
    <>
      <Breadcrumb pageName="Sold Items" />
      <div className="flex flex-col gap-10 h- justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="rounded-sm w-full border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-200 dark:bg-gray-700 sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <div className=" flex justify-center">
                <div className="flex items-center">
                  <div
                    onClick={() => {
                      let preDate = date.split("-");
                      preDate[2] = parseInt(preDate[2]) - 1;
                      preDate = preDate.join("-");
                      setDate(preDate);

                      reload({ date: preDate });
                    }}
                    className=" p-1 border-2 rounded-md"
                  >
                    <MdNavigateBefore className="text-3xl text-gray-400 cursor-pointer" />
                  </div>

                  <div className="p-1">{date}</div>

                  <div
                    onClick={() => {
                      let nexDate = date.split("-");
                      nexDate[2] = parseInt(nexDate[2]) + 1;
                      nexDate = nexDate.join("-");
                      setDate(nexDate);
                      reload({ date: nexDate });
                    }}
                    className=" p-1 border-2 rounded-md"
                  >
                    <MdNavigateNext className="text-3xl text-gray-400 cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className=" flex justify-between items-center mb-6">
                <h4 className=" text-xl font-semibold text-black dark:text-white">
                  Sold Items Table
                </h4>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left bg-gray-100 dark:bg-slate-600">
                    <th className="min-w-[150px] py-4 pl-5 font-medium text-black dark:text-white xl:pl-11">
                      Casher Name
                    </th>
                    <th className="min-w-[100px] py-4  font-medium text-black dark:text-white">
                      Product
                    </th>
                    <th className="min-w-[50px] py-4  font-medium text-black dark:text-white">
                      Quantity
                    </th>
                    <th className="min-w-[50px] py-4  font-medium text-black dark:text-white">
                      Price
                    </th>
                    <th className="min-w-[100px] py-4  font-medium text-black dark:text-white">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((SoldItem) => {
                    return (
                      <tr key={SoldItem.id}>
                        <td className="border-b border-[#eee] py-5 pl-5  dark:border-gray-500 xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {SoldItem.User.name}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5  dark:border-gray-500">
                          <p className="text-black dark:text-white">
                            {SoldItem?.Product.name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5  dark:border-gray-500">
                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                            {SoldItem?.quantity}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 dark:border-gray-500">
                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                            {SoldItem?.price}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 dark:border-gray-500">
                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                            {SoldItem?.saleDate.split("T")[0]}
                          </p>
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

export default SoldItems;
