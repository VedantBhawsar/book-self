import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages imports
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";

// Components imports
import { Navbar } from "./components/Navbar";
import { BookModal } from "./components/BookModal";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/library",
    element: <LibraryPage />,
  },
]);

function App() {
  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto bg-[#0F1117] min-h-screen">
        <Navbar />
        <div className="min-h-[86vh]">
          <RouterProvider router={router} />
        </div>
        <Footer />
        <BookModal />
        <Toaster
          toastOptions={{
            error: {
              style: {
                color: "white",
                backgroundColor: "#212121",
              },
              position: "bottom-center",
            },
            loading: {
              style: { color: "white", backgroundColor: "#212121" },
              position: "bottom-center",
            },
            success: {
              style: { color: "white", backgroundColor: "#212121" },
              position: "bottom-center",
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
