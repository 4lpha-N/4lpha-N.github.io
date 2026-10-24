import { Suspense } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

// Demo (inkl. framer-motion) erst bei Aufruf laden
// const Demo = lazy(() => import("./katalog/Demo.tsx"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Demo" element={<Demo />} />
        <Route path="/Produkte" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
