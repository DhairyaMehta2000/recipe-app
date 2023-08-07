import "./App.css";
import { Provider } from "react-redux";
import IngridientSearchForm from "./Components/IngridientSearchForm";
import appStore from "./utils/appStore";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <Provider store={appStore}>
      <Outlet />
    </Provider>
  );
}

export default App;
