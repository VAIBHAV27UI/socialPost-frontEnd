import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/action/postAction";
import { useEffect, useMemo } from "react";
import PostCard from "./PostCard";

const ViewOwnPost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const userId = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, posts]);

  const ownPosts = useMemo(() => {
    return posts.data?.filter((post) => post.createdBy?._id === userId?.id);
  }, [posts.data, userId]);

  const postStatuses = useMemo(
    () => posts.data?.map((p) => p.status).join(","),
    [posts.data]
  );

    useEffect(() => {
    if (postStatuses) {
      dispatch(getAllPosts());
    }
  }, [dispatch, postStatuses]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {ownPosts?.map((data, index) => (
          <PostCard
            key={index}
            title={data.title}
            text={data.information}
            image={data.image}
            author="own"
            status={data.status}
          />
        ))}
      </div>
    </>
  );
};

export default ViewOwnPost;
