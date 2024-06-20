import React from "react";
import Home from './components/Home/Home'
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
};

export default App;
