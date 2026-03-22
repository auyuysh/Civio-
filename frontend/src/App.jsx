import { useState } from "react";
import Topbar from "./components/Topbar";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";
import "./index.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("login");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app-container">

      <div className={showModal ? "blur" : ""}>
        <Topbar refreshKey={refreshKey} setRefreshKey={setRefreshKey} setShowModal={setShowModal} setMode={setMode} />
        <Home key={refreshKey} />
      </div>

      {showModal && (
        <AuthModal
          setShowModal={setShowModal}
          mode={mode}
          setMode={setMode}
          setRefreshKey={setRefreshKey}
        />
      )}
    </div>
  );
}

export default App;