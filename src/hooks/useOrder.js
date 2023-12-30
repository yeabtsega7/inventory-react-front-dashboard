import { useEffect, useState } from "react";
import { instance } from "../lib/Axios";
import useFlashmessage from "./useFlashmessage";

const useOrder = ({ basurl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
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

  const addOrder = ({ product }) => {
    const index = order.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      if (product.quantity === 0) {
        setFlashmessage("this product is not available", true);
        return;
      }
      let temp = [...order];
      temp[index].quantity = temp[index].quantity + 1;
      setOrder(temp);
    } else {
      if (product.quantity === 0) {
        setFlashmessage("this product is not available", true);
        return;
      }
      let temp1 = { product, quantity: 1 };
      setOrder([...order, temp1]);
    }

    let productsUpda = [...data];
    const index1 = data.findIndex((item) => item.id === product.id);
    productsUpda[index1].quantity = productsUpda[index1].quantity - 1;
    setData([...productsUpda]);
  };

  const incOrder = ({ Order }) => {
    const index = order.findIndex(
      (item) => item.product.id === Order.product.id
    );
    const ProductIndex = data.findIndex((item) => item.id === Order.product.id);
    if (index !== -1) {
      if (data[ProductIndex].quantity === 0) {
        setFlashmessage("this product is not available", true);
        return;
      }
      let temp = [...order];
      temp[index].quantity = temp[index].quantity + 1;
      setOrder(temp);
      let productsUpda = [...data];
      const index1 = data.findIndex((item) => item.id === Order.product.id);
      productsUpda[ProductIndex].quantity = productsUpda[index1].quantity - 1;
      setData([...productsUpda]);
    }
  };
  const decOrder = ({ Order }) => {
    const index = order.findIndex(
      (item) => item.product.id === Order.product.id
    );
    if (index !== -1) {
      if (order[index].quantity <= 1) {
        let temp = [...order];
        temp.splice(index, 1);
        setOrder(temp);
      } else {
        let temp = [...order];
        temp[index].quantity = temp[index].quantity - 1;
        setOrder(temp);
      }
      const ProductIndex = data.findIndex(
        (item) => item.id === Order.product.id
      );
      let productsUpda = [...data];
      const index1 = data.findIndex((item) => item.id === Order.product.id);
      productsUpda[ProductIndex].quantity = productsUpda[index1].quantity + 1;
      setData([...productsUpda]);
    }
  };

  const deleteOrder = ({ Order }) => {
    const index = order.findIndex(
      (item) => item.product.id === Order.product.id
    );
    if (index !== -1) {
      let temp = [...order];
      const quantity = temp[index].quantity;
      temp.splice(index, 1);
      setOrder(temp);
      const ProductIndex = data.findIndex(
        (item) => item.id === Order.product.id
      );
      let productsUpda = [...data];
      const index1 = data.findIndex((item) => item.id === Order.product.id);
      productsUpda[ProductIndex].quantity =
        productsUpda[index1].quantity + quantity;
      setData([...productsUpda]);
    }
  };
  const buy = () => {
    order.map((item) => {
      const formData = new FormData();
      formData.append("productId", item.product.id);
      formData.append("quantity", item.quantity);
      formData.append("price", item.product.price * item.quantity);
      instance
        .post("/sale", formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setFlashmessage("Order created successfully", false);
            setOrder([]);
            const index = data.findIndex((i) => i.id === res.data.product.id);
            if (index !== -1) {
              let temp = [...data];
              temp[index] = res.data.product;
              setData(temp);
            }
          }
        })
        .catch((err) => {
          setFlashmessage(err.response.data.message, true);
          console.log(err);
        });
    });
  };

  return {
    data,
    loading,
    reload,
    addOrder,
    incOrder,
    decOrder,
    deleteOrder,
    order,
    buy,
  };
};

export default useOrder;
