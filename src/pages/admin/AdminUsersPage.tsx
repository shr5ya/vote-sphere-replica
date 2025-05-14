
import UserManagement from "@/components/admin/UserManagement";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useEffect } from "react-router-dom";

const AdminUsersPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return <UserManagement />;
};

export default AdminUsersPage;
