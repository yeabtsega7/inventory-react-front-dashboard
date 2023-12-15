import useFlashmessage from "../hooks/useFlashmessage";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const FlashmessagesComponent = () => {
  const { Flashmessage, removeFlashmessage } = useFlashmessage();
  return (
    <div className=" fixed z-[9999999] top-5 w-[80vw] sm:w-[50vw] xl:w-[30vw] left-[50%] translate-x-[-50%]  h-5 flex justify-start items-center flex-col gap-2 ">
      {Flashmessage.Flashmessages.map((flashmessage, index) => {
        return (
          <div
            key={index}
            className={` bg-white flex justify-between items-center w-full   border-l-4  drop-shadow-xl ${
              flashmessage.error ? "border-red-500" : "border-green-500"
            }`}
          >
            <div className=" flex items-center ">
              <div className=" px-3">
                {flashmessage.error ? (
                  <div className=" text-red-500 text-[1.8rem]">
                    <FaXmark />
                  </div>
                ) : (
                  <div className=" text-green-500 text-[1.5rem]">
                    <FaCheck />
                  </div>
                )}
              </div>
              <div>
                {flashmessage.error ? (
                  <div className=" text-red-500 text-[0.9rem]">Error</div>
                ) : (
                  <div className=" text-green-500 text-[0.9rem]">Success</div>
                )}
                <p className=" text-[0.8rem] text-gray-500 ">
                  {flashmessage.message}
                </p>
              </div>
            </div>
            <div className="  px-5  border-l-2 flex justify-center items-center ">
              <div
                className=" cursor-pointer"
                onClick={() => removeFlashmessage(flashmessage.id)}
              >
                close
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlashmessagesComponent;
