import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Todo from './components/Todo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/signup" element={<SignUpForm />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/todo" element={<Todo />}/>
    </Routes>
  </BrowserRouter>);
}

export default App;
