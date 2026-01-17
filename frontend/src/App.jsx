import { Router, Route } from "@solidjs/router";
import { Toaster } from "solid-toast";

// Import your pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import Blueprint from "./pages/Blueprint";

// --- 1. Define the Layout ---
// This wrapper ensures the Toaster is always present,
// and "props.children" will be whatever page you are on.
const Layout = (props) => {
  return (
    <>
      <Toaster position="bottom-center" gutter={8} />
      {props.children}
    </>
  );
};

function App() {
  return (
    // --- 2. Tell Router to use the Layout as the 'root' ---
    <Router root={Layout}>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/team" component={Team} />
      <Route path="/blueprint" component={Blueprint} />
    </Router>
  );
}

export default App;