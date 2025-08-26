import { useNavigate } from "react-router-dom";

function Navbar(){
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
};

return(
    <div className="z-[9999] bg-white shadow rounded-b-sm text-black fixed top-0 left-0 w-full h-10 flex items-center justify-between px-4 shadow z-50">
        <div>
            <p>Room Mapping</p>
        </div>
        <div>
            {localStorage.getItem('token')?<button className="bg-gray-200 hover:bg-gray-300 px-3 rounded cursor-pointer transition-all duration-300" onClick={handleLogout}>Logout</button>:<button onClick={()=>navigate('/signin')} className="bg-gray-200 hover:bg-gray-300 px-3 rounded cursor-pointer transition-all duration-300">Login</button>}
        </div>
    </div>
)
}

export default Navbar;