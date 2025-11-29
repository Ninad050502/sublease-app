import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToUserRoute = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");
    
    if (username && role) {
      if (role === "giver") {
        navigate(`/${username}/listings`, { replace: true });
      } else {
        navigate(`/${username}/browse`, { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  
  return null;
};

export default RedirectToUserRoute;

