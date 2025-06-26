import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Usage from "./pages/Usage";
import Roadmap from "./pages/Roadmap";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import CoursesPage from "./pages/CoursesPage";
import Buy from "./pages/Buy";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
