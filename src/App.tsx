import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Carregamento sob demanda: cada página só baixa seu próprio código
// quando o visitante realmente acessa aquela rota (reduz o JS inicial).
const Index = lazy(() => import("./pages/Index.tsx"));
const PatrocinioEvento = lazy(() => import("./pages/PatrocinioEvento.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

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
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/apresentadora" element={<Navigate to="/#apresentadora" replace />} />
            <Route path="/evento26-08" element={<PatrocinioEvento />} />
            {/* Legacy route aliases → /evento26-08 */}
            <Route path="/patrocinio-evento" element={<Navigate to="/evento26-08" replace />} />
            <Route path="/evento-2608" element={<Navigate to="/evento26-08" replace />} />
            <Route path="/evento-26-08" element={<Navigate to="/evento26-08" replace />} />
            <Route path="/evento" element={<Navigate to="/evento26-08" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
