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

export const editComment = async (rest, stars, comment, date) => {
  const data = await commentService.put(`/usercomment/${rest}/edit`, {
    stars,
    comment,
    date
  });
  console.log(data);
  return data.data.comments;
};

export const getComments = async endpoint => {
  const data = await commentService.get(`/${endpoint}`);
  console.log(data.data.comments);
  return data.data.comments;
};

export const getUserComment = async endpoint => {
  const data = await commentService.get(`/usercomment/${endpoint}`);
  console.log(data);
  return data.data.comments;
};

export const deleteComment = async endpoint => {
  const data = await commentService.post(`/usercomment/${endpoint}/delete`);
  console.log(data);
  return data;
};
