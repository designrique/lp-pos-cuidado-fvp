import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy load rotas não críticas para melhor performance
const NotFound = lazy(() => import("./pages/NotFound"));
const MauticTest = lazy(() => import("./pages/MauticTest"));
const DiagnosticPage = lazy(() => import("./pages/Diagnostic"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Otimizações de React Query
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

// Componente de loading simples
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/mautic-test" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <MauticTest />
              </Suspense>
            } 
          />
          <Route 
            path="/diagnostic" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DiagnosticPage />
              </Suspense>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route 
            path="*" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <NotFound />
              </Suspense>
            } 
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
