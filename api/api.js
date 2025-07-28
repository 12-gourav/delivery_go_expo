import axios from "axios";
import Toast from "react-native-toast-message";

const url = "https://bakersline-backend.onrender.com/api/v1";

const ErrorMsg = (e) => {
  console.log(e);
  Toast.show({
    type: "error",
    text1: "Oops!",
    text2: e?.response?.data?.msg,
  });
};

export const upcomingOrdersAPI = async (token) => {
  try {
    return await axios.get(url + "/upcoming/orders/by/agent", {
      params: {},
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const OrdersAPI = async (current, date, query, status, token) => {
  try {
    return await axios.get(url + "/get/agent/orders", {
      params: {
        page: current,
        date: date,
        query,
        limit: 10,
        status,
      },
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const GetOrdersDetails = async (id) => {
  try {
    return await axios.get(url + "/order/detail", {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const orderUpdateAPI = async (id, otp, reason, flag, token) => {
  try {
    return await axios.get(url + "/update/order/by/agent/through/customer", {
      params: {
        orderId: id,
        otp: otp,
        reason,
        flag,
      },
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "error",
      text1: "Oops!",
      text2: "Failed to complete order",
    });
  }
};

export const GetPaymentsDetails = async (
  current,
  date,
  query,
  status,
  token
) => {
  try {
    return await axios.get(url + "/agent/payments", {
      params: {
        page: current,
        limit: 10,
        date: date,
        query,
        status,
      },
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};
