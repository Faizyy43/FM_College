import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import LoginPage from "../LoginPages/LoginPage";
import { toast } from "react-hot-toast";

const AdminLoginContainer = () => {
  const navigate = useNavigate();

  const onUsernameSubmit = async (identifier, setStep, setErrors) => {
    
    setStep("PASSWORD");
  };

  const onLoginSubmit = async (identifier, password, setErrors) => {
    try {
      const res = await api.post("/admin/login", { identifier, password });

      const { token, role, name } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      toast.success("Admin login successful");

      navigate("/admin/dashboard");
    } catch (err) {
      setErrors({ password: "Invalid credentials" });
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <LoginPage
      onUsernameSubmit={onUsernameSubmit}
      onLoginSubmit={onLoginSubmit}
    />
  );
};

export default AdminLoginContainer;
