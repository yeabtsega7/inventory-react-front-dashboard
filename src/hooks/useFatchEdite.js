import { useEffect, useState } from "react";
import { instance } from "../lib/Axios";
import useFlashmessage from "./useFlashmessage";

const useFatchEdite = ({ basurl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setFlashmessage } = useFlashmessage();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      instance
        .get(basurl, {
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
  const reload = async () => {
    setLoading(true);
    instance
      .get(basurl)
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
  const edite = async (data) => {
    setLoading(true);
    instance
      .put(basurl, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          console.log(data);
          setData(res.data.data);
          setFlashmessage(res.data.message, false);
          setLoading(false);
        }
      })
      .catch((err) => {
        setFlashmessage(err.response.data.message, true);
        setLoading(false);
        console.log(err);
      });
  };

  return { data, loading, reload, edite };
};

export default useFatchEdite;
