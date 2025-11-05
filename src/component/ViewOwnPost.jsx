import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/action/postAction";
import { useEffect, useMemo, useState } from "react";
import PostCard from "./PostCard";

const SkeletonCard = () => (
  <div className="border rounded-xl p-4 animate-pulse border-gray-300">
    <div className="h-40 bg-gray-300 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
  </div>
);

const ViewOwnPost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const userId = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);

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

  const skeletonCount = ownPosts?.length || 6;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {isLoading
          ? Array(skeletonCount)
              .fill()
              .map((_, index) => <SkeletonCard key={index} />)
          : ownPosts?.map((data, index) => (
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
