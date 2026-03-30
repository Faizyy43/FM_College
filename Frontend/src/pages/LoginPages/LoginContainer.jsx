import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import LoginPage from "./LoginPage";
import { toast } from "react-hot-toast";

const LoginContainer = () => {
  const navigate = useNavigate();

  const onUsernameSubmit = async (identifier, setStep, setErrors) => {
    try {
      const res = await api.post("/auth/check-identifier", { identifier });

      if (res.data.status === "USER_NOT_FOUND") {
        setErrors({ identifier: "User not found" });
        toast.error("User not found", {
          className: "text-lg font-semibold px-6 py-4 rounded-xl bg-red-600 text-white text-center shadow-lg",
          duration: 2000,
        });
        return;
      }

      if (res.data.status === "SET_PASSWORD_REQUIRED") {
        toast.success("Please set your password", {
          className: "text-lg font-semibold px-6 py-4 rounded-xl bg-indigo-600 text-white text-center shadow-lg",
          duration: 2000,
        });
        navigate("/set-password", {
          state: { token: res.data.inviteToken },
        });
        return;
      }

      if (res.data.status === "PASSWORD_REQUIRED") {
        setStep("PASSWORD");
      }

    } catch (error) {
      setErrors({ identifier: "Something went wrong" });
      toast.error("Something went wrong", {
        className: "text-lg font-semibold px-6 py-4 rounded-xl bg-red-600 text-white text-center shadow-lg",
        duration: 2000,
      });
    }
  };

  const onLoginSubmit = async (identifier, password, setErrors) => {
    try {
      const res = await api.post("/auth/login", { identifier, password });

      if (res.data.status !== "SUCCESS") {
        setErrors({ password: "Invalid credentials" });
        toast.error("Invalid credentials", {
          className: "text-lg font-semibold px-6 py-4 rounded-xl bg-red-600 text-white text-center shadow-lg",
          duration: 1500,
        });
        return;
      }

      const { token, role, name } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      toast.success("Login successful!", {
        className: "text-lg font-semibold px-6 py-4 rounded-xl bg-indigo-600 text-white text-center shadow-lg",
        duration: 1500,
      });

      // Delay navigation so user sees toast
      setTimeout(() => {
        if(role === "STUDENT") {
          navigate("/");
        } else {
          navigate(`/${role.toLowerCase()}/dashboard`)
        }
      }, 1500);

    } catch (err) {
      setErrors({ password: err.response?.data?.message || "Login failed" });
      toast.error(err.response?.data?.message || "Login failed", {
        className: "text-lg font-semibold px-6 py-4 rounded-xl bg-red-600 text-white text-center shadow-lg",
        duration: 2000,
      });
    }
  };

  return <LoginPage onUsernameSubmit={onUsernameSubmit} onLoginSubmit={onLoginSubmit} />;
};

export default LoginContainer;

