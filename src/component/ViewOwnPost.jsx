import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/action/postAction";
import { useEffect } from "react";
import PostCard from "./PostCard";

const ViewOwnPost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const userId = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const ownpost = posts.data?.filter(
    (post) => post.createdBy?._id === userId.id
  );


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {ownpost?.map((data, index) => (
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
