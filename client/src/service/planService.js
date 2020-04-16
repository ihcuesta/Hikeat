import axios from "axios";

const planService = axios.create({
  baseURL: "http://localhost:4000/plan",
  withCredentials: true
});

export const getLastPlansRest = async endpoint => {
  const data = await planService.get(`/lastplansrest/${endpoint}`);
  console.log(data.data.plans);
  return data.data.plans;
};

export const getAllPlans = async () => {
  const data = await planService.get("/all");
  console.log(data.data.plans);
  return data.data.plans;
};

export const newPlan = async ({
  name,
  hikelevel,
  shortDescr,
  longDescr,
  startPoint,
  kms,
  image1,
  image2,
  image3,
  image4,
  image5,
  date,
  startTime,
  lunchTime,
  kids,
  brunch,
  maxBookings,
  bookings,
  breakfast,
  firstCourse,
  secondCourse,
  dessert,
  drinks,
  bread,
  coffee,
  status
}) => {
  try {
    const { data } = await planService.post("/new", {
      name,
      hikelevel,
      shortDescr,
      longDescr,
      startPoint,
      kms,
      image1,
      image2,
      image3,
      image4,
      image5,
      date,
      startTime,
      lunchTime,
      kids,
      brunch,
      maxBookings,
      bookings,
      breakfast,
      firstCourse,
      secondCourse,
      dessert,
      drinks,
      bread,
      coffee,
      status
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchSinglePlan = async endpoint => {
  const { data } = await planService.get(`/${endpoint}`);
  return data;
};

export const fetchEditPlan = async endpoint => {
  const { data } = await planService.get(`/${endpoint}/edit`);
  return data;
};

export const editPlan = async (
  endpoint,
  {
    name,
    hikelevel,
    shortDescr,
    longDescr,
    startPoint,
    kms,
    image1,
    image2,
    image3,
    image4,
    image5,
    date,
    startTime,
    lunchTime,
    kids,
    brunch,
    maxBookings,
    bookings,
    breakfast,
    firstCourse,
    secondCourse,
    dessert,
    drinks,
    bread,
    coffee,
    status
  }
) => {
  try {
    const { data } = await planService.put(`/${endpoint}/edit`, {
      name,
      hikelevel,
      shortDescr,
      longDescr,
      startPoint,
      kms,
      image1,
      image2,
      image3,
      image4,
      image5,
      date,
      startTime,
      lunchTime,
      kids,
      brunch,
      maxBookings,
      bookings,
      breakfast,
      firstCourse,
      secondCourse,
      dessert,
      drinks,
      bread,
      coffee,
      status
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePlan = async endpoint => {
  const { data } = await planService.post(`/${endpoint}/delete`);
  return data;
};
