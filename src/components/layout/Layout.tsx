
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "../admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  // Simulate loading for animation purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        
        {isAdmin && (
          <Sidebar className="hidden md:flex top-16 h-[calc(100vh-4rem)]" variant="sidebar" side="left">
            <div className="flex items-center justify-end p-2">
              <SidebarTrigger />
            </div>
            <AdminSidebar />
          </Sidebar>
        )}
        
        <SidebarInset>
          <main className="flex-grow pb-16">
            <div className="container py-8">
              {isLoading ? (
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="animate-pulse h-8 w-32 bg-muted rounded"></div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <Outlet />
                </div>
              )}
            </div>
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
