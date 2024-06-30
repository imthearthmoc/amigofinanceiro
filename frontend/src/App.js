import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Expense from './components/Expense';
import { Category, SubCategory } from './components/Category';
import PieChart from './components/PieChart';
import History from './components/History';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeTab, setActiveTab] = useState('login'); // Estado para gerenciar a aba ativa

  const fetchExpenses = () => {
    axios.get('http://localhost:3001/expenses', { headers: { 'x-access-token': token } })
      .then(response => {
        setExpenses(response.data);
      });
  };

  const fetchCategories = () => {
    axios.get('http://localhost:3001/categories', { headers: { 'x-access-token': token } })
      .then(response => {
        setCategories(response.data);
      });
  };

  const fetchSubcategories = () => {
    axios.get('http://localhost:3001/subcategories', { headers: { 'x-access-token': token } })
      .then(response => {
        setSubcategories(response.data);
      });
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchCategories();
      fetchSubcategories();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="containerApp-login_register">
        <div className="containerApp-button_login_register">
          <button className={`appButton_login ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            Login
          </button>
          <button className={`appButton_register ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
            Registrar
          </button>
        </div>
          {activeTab === 'login' ? ( <Login setToken={setToken}/>) : (<Register/>)}
      </div>
    );
  }

  return (
    <div>
      <div className='h1-amigoFinanceiro'>
        <h1>Amigo Financeiro</h1>
      </div>
      <History expenses={expenses} />
      <PieChart expenses={expenses} />
      <div className='div-containerApp'>
        <Category fetchCategories={fetchCategories} />
        <SubCategory categories={categories} fetchSubcategories={fetchSubcategories} />
        <Expense categories={categories} fetchExpenses={fetchExpenses} />
      </div>
    </div>
  );
};

export default App;