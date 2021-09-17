import './App.css';
import { UserContextProvider } from './contexts/auth-user';
import { Home } from './pages';

function App() {
  return (
    <UserContextProvider>
      <Home />
    </UserContextProvider>
  );
}

export default App;
