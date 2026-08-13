import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import PatrocinioEvento from "./pages/PatrocinioEvento.tsx";
import Apresentadora from "./pages/Apresentadora.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apresentadora" element={<Apresentadora />} />
          <Route path="/evento26-08" element={<PatrocinioEvento />} />
          {/* Legacy route aliases → /evento26-08 */}
          <Route path="/patrocinio-evento" element={<Navigate to="/evento26-08" replace />} />
          <Route path="/evento-2608" element={<Navigate to="/evento26-08" replace />} />
          <Route path="/evento-26-08" element={<Navigate to="/evento26-08" replace />} />
          <Route path="/evento" element={<Navigate to="/evento26-08" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
