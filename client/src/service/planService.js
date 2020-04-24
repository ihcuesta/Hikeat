import axios from "axios";

const planService = axios.create({
  baseURL: "http://localhost:4000/plan",
  withCredentials: true
});

export const getPlansOfRestaurant = async endpoint => {
  const data = await planService.get(`/restaurant/${endpoint}`);
  console.log(data.data.getRest);
  return data.data.getRest;
};

export const getPlansPage = async num => {
  const data = await planService.get(`/pages/${num}`);
  return data.data.plans;
};

export const getPlansPageRegion = async (region, num) => {
  const data = await planService.get(`/pages/${region}/${num}`);
  return data.data.plans;
};

export const getAllPlans = async () => {
  const data = await planService.get("/all");
  return data.data.plans;
};

export const getTotal = async () => {
  const data = await planService.get(`/pages/total`);
  return data.data.total;
};

export const getTotalRegion = async region => {
  const data = await planService.get(`/pages/total/${region}`);
  return data.data.total;
};

export const getByRegion = async region => {
  const data = await planService.get(`/pages/region/${region}`);
  return data.data.plansRegion;
};

const formatDate = date => {
  return date
    .split("-")
    .reverse()
    .join("-");
};

export const newPlan = async ({
  name,
  hikelevel,
  shortDescr,
  longDescr,
  highlights,
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
  // maxBookings,
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
    const newDate = formatDate(date);
    const { data } = await planService.post("/new", {
      name,
      hikelevel,
      shortDescr,
      longDescr,
      highlights,
      startPoint,
      kms,
      image1,
      image2,
      image3,
      image4,
      image5,
      date: newDate,
      startTime,
      lunchTime,
      kids,
      brunch,
      // maxBookings,
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

export const checkIfManager = async endpoint => {
  const { data } = await planService.get(`/manager/${endpoint}`);
  console.log(data);
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
    highlights,
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
    // maxBookings,
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
      highlights,
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
      // maxBookings,
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
    return error;
  }
};

export const deletePlan = async endpoint => {
  const { data } = await planService.post(`/${endpoint}/delete`);
  return data;
};
