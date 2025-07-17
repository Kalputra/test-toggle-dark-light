import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Page2 from "../Pages/Page2";
import Page3 from "../Pages/Page3";
import { ThemeProvider } from "../Context/ThemeContext";
import Anime from "../Pages/Anime";
import Form from "../Pages/Form";

export default function Router() {
  return (
    <div>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Anime" element={<Anime />} />
              <Route path="/Form" element={<Form />} />
              <Route path="/page2" element={<Page2 />} />
              <Route path="/page3" element={<Page3 />} />
            </Route>
            {/* Add other routes here */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
