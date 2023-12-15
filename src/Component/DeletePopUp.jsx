/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";
const DeletePopUp = (props) => {
  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 z-[999999] bg-black dark:bg-white dark:bg-opacity-10 bg-opacity-40 flex justify-center items-center`}
    >
      <div className=" lg:w-[50vw] sm:w-[80vw] w-[90vw] rounded-lg shadow-lg drop-shadow-lg bg-white dark:bg-gray-700 overflow-hidden">
        <div className="w-full h-16 flex items-center px-10 gap-2 bg-red-600 text-white">
          <MdDeleteForever className=" text-[1.5rem]" />
          <p>Confirm Deletion</p>
        </div>
        <div className=" w-full px-10 py-5">
          Are you sure you want to delete <strong>{props?.item}</strong>? This
          action cannot be undone once it is deleted.
        </div>
        <div className="flex justify-end gap-5 items-center px-10 pb-10">
          <div
            className=" text-blue-500 cursor-pointer"
            onClick={() => {
              props?.setShow(false);
            }}
          >
            Cancel
          </div>
          <div
            onClick={() => {
              props?.action();
              props?.setShow(false);
            }}
            className="px-4 py-2 bg-red-700 rounded-md cursor-pointer text-white "
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
