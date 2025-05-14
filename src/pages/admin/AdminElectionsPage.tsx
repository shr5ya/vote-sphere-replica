
import ElectionManagement from "@/components/admin/ElectionManagement";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useEffect } from "react-router-dom";

const AdminElectionsPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return <ElectionManagement />;
};

export default AdminElectionsPage;
