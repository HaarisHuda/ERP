import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BilldeskTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('asc');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://admin.erp.mait.ac.in/fee/feerouterbilldesktransaction/');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleSortByTransactionTime = () => {
    const sortedTransactions = [...transactions];
    sortedTransactions.sort((a, b) => {
      if (sortBy === 'asc') {
        return new Date(a.transaction_time) - new Date(b.transaction_time);
      } else {
        return new Date(b.transaction_time) - new Date(a.transaction_time);
      }
    });
    setTransactions(sortedTransactions);
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  const formatTime = (timeString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(timeString).toLocaleString('en-US', options);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.order_id.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_id.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_amount.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_status.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.payment_method.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_time.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Completed Billdesk Transactions</h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        value={filterText}
        onChange={handleFilterChange}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
              ORDER ID
            </th>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
              TRANSACTION ID
            </th>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
              TRANSACTION AMOUNT
            </th>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
              TRANSACTION STATUS
            </th>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
              PAYMENT METHOD
            </th>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
              TRANSACTION TIME
              {sortBy === 'asc' ? ' ↑' : ' ↓'}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={transaction.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
              <td className="border border-gray-300 px-4 py-2">{transaction.order_id}</td>
              <td className="border border-gray-300 px-4 py-2">{transaction.transaction_id}</td>
              <td className="border border-gray-300 px-4 py-2">{transaction.transaction_amount}</td>
              <td className="border border-gray-300 px-4 py-2">{transaction.transaction_status}</td>
              <td className="border border-gray-300 px-4 py-2">{transaction.payment_method}</td>
              <td className="border border-gray-300 px-4 py-2">{formatTime(transaction.transaction_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BilldeskTransactions;
