import { Tractor } from "@aircall/tractor";
import { Provider } from "./graphql/Provider";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import CallList from "./pages/CallList";
import CallDetails from "./pages/CallDetails";
import Home from "./pages/Home";

const App: React.FC = () => (
  <Tractor injectStyle>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/calls" element={<CallList />} />
          <Route path="/call/:id" element={<CallDetails />} />
          <Route path="/*" element={<Navigate replace to="/home" />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </Tractor>
);

export default App;
