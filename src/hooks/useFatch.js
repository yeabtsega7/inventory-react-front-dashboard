import { useEffect, useState } from "react";
import { instance } from "../lib/Axios";
import useFlashmessage from "./useFlashmessage";

const useFatch = ({ basurl, params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setFlashmessage } = useFlashmessage();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      instance
        .get(basurl, {
          params: params,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          setFlashmessage(err.response.data.message, true);
          setLoading(false);
          console.log(err);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basurl]);
  const reload = async (params) => {
    setLoading(true);
    instance
      .get(basurl, {
        params: params ? params : null,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setFlashmessage(err.response.data.message, true);
        setLoading(false);
      });
  };

  const remove = async (id) => {
    setLoading(true);
    instance
      .delete(basurl + "/" + id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 204) {
          console.log(res);
          setFlashmessage("Deleted successfully", false);
          setData(
            data.filter((item) => {
              return item.id !== id;
            })
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        setFlashmessage(err.response.data.message, true);
        setLoading(false);
        console.log(err);
      });
  };

  return { data, loading, reload, remove };
};

export default useFatch;
