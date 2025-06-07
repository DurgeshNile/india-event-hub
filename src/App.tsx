
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Auth from "./pages/Auth";
import ContributorDashboard from "./pages/ContributorDashboard";
import UserDashboard from "./pages/UserDashboard";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import EventListing from "./pages/EventListing";
import ProviderRegistration from "./pages/ProviderRegistration";
import AdminDashboard from "./pages/AdminDashboard";
import LocationSearch from "./pages/LocationSearch";
import NearbyEvents from "./pages/NearbyEvents";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/category/:categoryId" 
                element={
                  <ProtectedRoute>
                    <CategoryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/search" 
                element={
                  <ProtectedRoute>
                    <LocationSearch />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/nearby-events" 
                element={
                  <ProtectedRoute>
                    <NearbyEvents />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user-dashboard" 
                element={
                  <ProtectedRoute requiredUserType="user">
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/provider-dashboard" 
                element={
                  <ProtectedRoute requiredUserType="contributor">
                    <ServiceProviderDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requiredUserType="contributor">
                    <ContributorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/events" 
                element={
                  <ProtectedRoute>
                    <EventListing />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/register-provider" 
                element={
                  <ProtectedRoute>
                    <ProviderRegistration />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="*" 
                element={
                  <ProtectedRoute>
                    <NotFound />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
