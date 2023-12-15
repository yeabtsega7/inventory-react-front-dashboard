import { useDispatch, useSelector } from "react-redux";
import {
  setFlashmessages,
  removeFlashmessages,
} from "../state/Flashmessage/Flashmessage";
import { useEffect } from "react";

const useFlashmessage = () => {
  const Flashmessage = useSelector((state) => state.Flashmessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Flashmessage.Flashmessages.length > 3) {
      const id = Flashmessage.Flashmessages[0].id;
      dispatch(removeFlashmessages({ id: id }));
    }
  }, [Flashmessage, dispatch]);

  const setFlashmessage = (message, isError) => {
    const errorid = Date.now();
    dispatch(
      setFlashmessages({ message: message, id: errorid, error: isError })
    );
    setTimeout(() => {
      dispatch(removeFlashmessages({ id: errorid }));
    }, 10000);
  };
  const removeFlashmessage = (id) => {
    dispatch(removeFlashmessages({ id: id }));
  };

  return { Flashmessage, setFlashmessage, removeFlashmessage };
};

export default useFlashmessage;
