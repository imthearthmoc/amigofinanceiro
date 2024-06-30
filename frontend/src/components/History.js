import React from 'react';

const History = ({ expenses }) => {
  return (
    <div>
      <h2>Histórico de Despesas</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Categoria</th>
            <th>Subcategoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.category_name}</td>
              <td>{expense.subcategory_name}</td>
              <td>R${expense.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
