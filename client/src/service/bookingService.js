import axios from "axios";

const bookingService = axios.create({
  baseURL: "http://localhost:4000/booking",
  withCredentials: true
});

export const newBooking = async ({ planid, restid, numhikers, comments }) => {
  try {
    const { data } = await bookingService.post("/new", {
      planid,
      restid,
      numhikers,
      comments
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllBookings = async () => {
  const { data } = await bookingService.get(`/all`);
  return data;
};

export const getSingleBooking = async endpoint => {
  const { data } = await bookingService.get(`/${endpoint}`);
  return data;
};

export const getEditBooking = async endpoint => {
  const { data } = await bookingService.get(`/${endpoint}/edit`);
  console.log("llega");
  return data;
};

export const editBooking = async (endpoint, { numhikers, comments }) => {
  try {
    const { data } = await bookingService.put(`/${endpoint}/edit`, {
      numhikers,
      comments
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteBooking = async endpoint => {
  const { data } = await bookingService.post(`/${endpoint}/delete`);
  return data;
};
