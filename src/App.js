import { Provider } from "react-redux";
import './App.css';
import Home from './pages/Home';
import store from './store/store'
function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
