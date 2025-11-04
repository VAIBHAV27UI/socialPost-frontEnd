import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <>
      <div className="w-full bg-black text-white flex justify-between px-10 py-5">
        <div className="text-2xl">SocialPost Admin</div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-900 py-2 px-5 rounded-md cursor-pointer active:scale-95 transition-all hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
