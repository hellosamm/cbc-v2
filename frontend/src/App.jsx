import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Home";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div id="root-container">
      <Navbar />
      {/* <Features /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
