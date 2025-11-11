import { Routes, Route, Link } from "react-router-dom";
import CrewForm from "./components/CrewForm";
import CrewList from "./components/CrewList";
import CrewDetail from "./components/CrewDetail";
import CrewEdit from "./components/CrewEdit";

export default function App() {
  return (
    <div>
      <h1>🌾 Stardew Crew Builder</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/new">Add Crewmate</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CrewList />} />
        <Route path="/new" element={<CrewForm />} />
        <Route path="/crew/:id" element={<CrewDetail />} />
        <Route path="/crew/:id/edit" element={<CrewEdit />} />
      </Routes>
    </div>
  );
}

