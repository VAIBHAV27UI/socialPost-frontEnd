import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { getAllPosts } from "../redux/action/postAction";

const SkeletonCard = () => (
  <div className="border rounded-xl p-4 animate-pulse border-gray-300">
    <div className="h-40 bg-gray-300 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
  </div>
);

const ViewPost = ({ title, text }) => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);
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

    const skeletonCount = otherPost?.length || 6;


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {loading
          ? Array(skeletonCount)
              .fill()
              .map((_, index) => <SkeletonCard key={index} />)
          : otherPost?.map((data, index) => (
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
