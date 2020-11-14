import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Table from "./Pages/Table/Table";
import Forms from "./Pages/Forms/Forms";

import Pagination from "./examples/Pagination/Pagination";

import "./styles/App/style.css";

function App() {
  return (
    <div>
      <Router>
        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/dash">Dash</Link>
          <Link to="/table">Table</Link>
          <Link to="/examplepagination">pagination example</Link>
          <Link to="/forms">Forms</Link>
        </div>

        <Route
          exact
          path="/"
          render={() => {
            return <div>Home</div>;
          }}
        />
        <Route exact path="/table" component={Table} />
        <Route exact path="/forms" component={Forms} />
        <Route exact path="/dash" component={Dashboard} />
        <Route exact path="/examplepagination" component={Pagination} />
      </Router>
    </div>
  );
}

export default App;
