import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import ContentEditor from "./pages/ContentEditor";
import Journal from "./pages/Journal";
import JournalDetail from "./pages/JournalDetail";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import TripFinder from "./pages/TripFinder";

const queryClient = new QueryClient();

import { Helmet } from 'react-helmet-async';

import { ContentModeProvider } from "./contexts/ContentModeContext";
import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContentModeProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Helmet>
            <title>Raou Travel | Bespoke Luxury Experiences</title>
            <meta name="description" content="Discover the world's most exclusive destinations with Raou Travel. We curate bespoke luxury experiences tailored to your unique desires." />
          </Helmet>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<PlaceholderPage />} />
            <Route path="/trip-finder" element={<TripFinder />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalDetail />} />
            <Route path="/admin/editor" element={<ContentEditor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContentModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
