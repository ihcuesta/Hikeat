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
  console.log("llega", endpoint);
  const { data } = await bookingService.get(`/${endpoint}/edit`);

  return data;
};

export const getBookingsOfPlan = async endpoint => {
  const { data } = await bookingService.get(`/${endpoint}/all`);

  return data;
};

export const editBooking = async (
  endpoint,

  newcounter,
  numhikers,
  comments
) => {
  try {
    console.log(numhikers);
    const { data } = await bookingService.put(`/${endpoint}/edit`, {
      newcounter,
      numhikers,
      comments
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteBooking = async endpoint => {
  console.log(endpoint);
  const { data } = await bookingService.post(`/${endpoint}/delete`);
  return data;
};
