import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({open, setOpen}) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);

  const [activeIndex, setActiveIndex] = useState(null);

  const menu = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Create Post",
      link: "/create-post",
    },
    {
      title: "View my Post",
      link: "/view-post",
    },
    {
      title: "View Other User Post",
      link: "view-post-all",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className={`z-1 flex flex-col max-sm:fixed h-screen max-sm:w-full max-sm:top-0 right-0 max-sm:left-0 transition-all md:bg-black  ${open ? "max-sm:translate-x-0 bg-[rgba(0,0,0,0.9)]" : "max-sm:translate-x-full bg-[rgba(0,0,0,)]" }`}>
        <Link to="/">
          <div className="text-white text-5xl text-center border-b-2 border-b-blue-400 py-5 mb-5">
            SocialMedia
          </div>
        </Link>

        {/* <h2 className="text-white px-5 text-3xl bg-gray-600/90 py-2">Hello, {user?.name}</h2> */}

        <div className="text-white">
          <div className="px-5 flex flex-col">
            {menu.map((data, index) => (
              <Link
                to={data.link}
                key={index}
                onClick={() => {setActiveIndex(index), setOpen(false)}}
                className={`cursor-pointer py-2 transition-colors duration-200  ${
                  activeIndex === index ? "text-blue-500" : "text-white"
                }`}
              >
                {data.title}
              </Link>
            ))}

            <div
              onClick={handleLogout}
              className="text-center rounded-md py-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 active:scale-95 transition-all"
            >
              Logout
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;
