import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { getAllPosts } from "../redux/action/postAction";

const ViewPost = ({ title, text }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const userId = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const postStatuses = posts.data?.map((post) => post.status).join(",");

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, postStatuses]);

  const otherPost = posts.data?.filter(
    (post) => post.createdBy?._id !== userId.id
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {otherPost?.map((data, index) => (
          <PostCard
            key={index}
            title={data.title}
            text={data.information}
            image={data.image}
            author={data.createdBy?.name}
            status={data.status}
          />
        ))}
      </div>
    </>
  );
};

export default ViewPost;
