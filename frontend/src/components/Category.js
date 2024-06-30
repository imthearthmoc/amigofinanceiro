import React, { useState } from 'react';
import axios from 'axios';

const Category = ({ fetchCategories }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/category', { name })
      .then(response => {
        setName('');
        fetchCategories();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
      <div className='div-container_category'>
        <div className='div-category'>
          <form onSubmit={handleSubmit} >
            <h2>Categoria</h2>
            <input className='input01-category' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da Categoria"/>
            <button className='input02-category' type="submit">Adicionar</button>
          </form>
        </div>
      </div>
  );
};

const SubCategory = ({ categories, fetchSubcategories }) => {
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/subcategory', { name, category_id: categoryId })
      .then(response => {
        setName('');
        setCategoryId('');
        fetchSubcategories();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
      <div className='div-container_subcategory'>
        <div className='div-subcategory'>
          <form onSubmit={handleSubmit} className="form-container">
            <h2>Subcategoria</h2>
            <select className="input01-subcategory" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Selecione uma categoria</option> {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
            </select>
            <input className="input02-subcategory" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da Subcategoria"/>
            <button className="input03-subcategory" type="submit">Adicionar</button>
          </form>
        </div>
      </div>
  );
};

export { Category, SubCategory };