
import DashboardAnalytics from "@/components/admin/DashboardAnalytics";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useEffect } from "react-router-dom";

const AdminDashboardPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return <DashboardAnalytics />;
};

export default AdminDashboardPage;
