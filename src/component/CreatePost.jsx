import { useRef, useState } from "react";
import bgImage from "./../assets/bg.jpg";
import API from "../utils/axios";

const CreatePost = () => {
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState({
    title: "",
    information: "",
    image: null,
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("information", postData.information);
      if (postData.image) formData.append("image", postData.image);

      const res = await API.post("/users/create-post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert(res.data.message);
        setPostData({
          title: "",
          information: "",
          image: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="flex p-5 min-h-screen w-full items-center justify-center bg-gray-400/20 bg-cover bg-no-repeat
"
        // style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="md:w-xl flex flex-col p-5 rounded-md bg-gray-500/90">
          <h1 className="text-center text-black text-xl font-bold mb-5">
            Create Post
          </h1>

          <form
            className="flex flex-col items-center text-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="w-full flex flex-col">
                <label className="text-white">Title</label>
                <input
                  className="h-12 p-2 mt-2 max-w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300 bg-white"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={postData.title}
                  required
                />
              </div>

              <div className="w-full flex flex-col">
                <label className="text-white">Information</label>
                <textarea
                  className="h-50 p-2 mt-2 max-w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300 bg-white"
                  name="information"
                  value={postData.information}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="w-full flex flex-col">
                <label className="text-white">Upload Image</label>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef} // <-- Attach ref here
                  onChange={handleFileChange}
                  className="h-12 p-2 mt-2 border border-gray-500/30 rounded outline-none focus:border-indigo-300 bg-gray-700 text-white w-xs"
                />
              </div>
            </div>

            <button className="bg-blue-800 text-white py-2 px-5 rounded-md mt-5 active:scale-95 cursor-pointer transition-all">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
