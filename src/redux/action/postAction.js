import API from "../../utils/axios";
import { fetchPostsFailure, fetchPostsStart, fetchPostsSuccess } from "../slice/postSlice";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch(fetchPostsStart());
    const response = await API.get("/get-all-post")
    dispatch(fetchPostsSuccess(response.data));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};

