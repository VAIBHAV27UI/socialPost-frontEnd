import { useSelector } from "react-redux";
import bgImage from "./../assets/bg.jpg";

const Home = () => {

    const user = useSelector((state) => state.user.currentUser)

  return (
    <>
      <div>
        <div
          className="flex p-5 h-screen w-full items-center justify-center bg-cover bg-no-repeat object-cover bg-gray-400/20
    "
          // style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h1 className="text-3xl text-white bg-fuchsia-600 py-5 px-5 rounded-md">Hello, {user.name}</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
