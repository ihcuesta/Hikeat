import axios from "axios";

const commentService = axios.create({
  baseURL: "http://localhost:4000/comment",
  withCredentials: true
});

export const newComment = async (rest, stars, comment, date) => {
  try {
    const data = await commentService.post(`${rest}/new`, {
      stars,
      comment,
      date
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const deleteFavourite = async id => {
//   try {
//     const { data } = await favouriteService.post(`${id}/delete`, {});
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
