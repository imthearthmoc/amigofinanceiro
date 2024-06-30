import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expense = ({ categories, fetchExpenses }) => {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (category) {
      axios.get(`http://localhost:3001/subcategories?category_id=${category}`)
        .then(response => {
          setSubcategories(response.data);
        });
    } else {
      setSubcategories([]);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = parseFloat(amount.replace(',', '.'));
    axios.post('http://localhost:3001/expense', { subcategory_id: subcategory, amount: formattedAmount, date: new Date().toISOString() })
      .then(response => {
        console.log(response.data);
        setAmount('');
        fetchExpenses();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
      <div className='div-container_expense'>
        <div className='div-expense'>
          <form onSubmit={handleSubmit}>
            <h2>Despesas</h2>
            <select className='input01-expense' value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Selecione a categoria</option>
              {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
            </select>
            <select className='input02-expense' value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
              <option value="">Selecione a subcategoria</option>
              {subcategories.map(sub => (<option key={sub.id} value={sub.id}>{sub.name}</option>))}
            </select>
            <input className='input03-expense' type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor da despesa"/>
            <button className='input04-expense' type="submit">Adicionar</button>
          </form>
        </div>
      </div>
  );
};

export default Expense;
