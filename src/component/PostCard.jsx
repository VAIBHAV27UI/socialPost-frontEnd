const PostCard = (props) => {
  return (
    <>
      <div>
        <div className="bg-white rounded-md p-4 shadow-lg">
          <h1 className="text-sm font-semibold text-gray-500"><span className="font-bold text-black">Author :</span> {props.author}</h1>
          <h1 className="text-lg font-semibold">{props.title}</h1>
          <img src={props.image} alt="" className="rounded-md mt-2" />
          <p className="text-sm mt-2">{props.text}</p>
          <p className={`text-right text-sm font-bold capitalize ${props.status == "approved" ? "text-green-900" : props.status == "rejected" ? "text-red-800" : "text-yellow-400"}`}>{props.status}</p>
        </div>
      </div>
    </>
  );
};

export default PostCard;
