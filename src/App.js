import logo from './logo.svg';
import './App.css';
import { FetchDailyData } from './api/index'

function App() {
  return (
    <div className="App">
      <FetchDailyData />
    </div>
  );
}

export default App;
