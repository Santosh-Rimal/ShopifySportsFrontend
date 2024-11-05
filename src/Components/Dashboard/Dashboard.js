import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  const prepareDataForChart = () => {
    const categoryCount = {};

    products.map((product) => {
      const category = product.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return Object.keys(categoryCount).map((category) => ({
      name: category,
      value: categoryCount[category],
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className='mb-10 text-center'>
      <span className='flex container'>
        <Link to='/dashboard' className='text-gray-700'>
          Dashboard
        </Link>
      </span>
      <h2 className='mb-4'>Product Distribution by Categories</h2>
      <div className='mx-auto' style={{ width: '80%' }}>
        <ResponsiveContainer width='100%' height={400}>
          <PieChart>
            <Pie
              data={prepareDataForChart()}
              dataKey='value'
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#8884d8'
              label={({ name }) => name}
            >
              {prepareDataForChart().map((entry, index) => 
                <Cell fill={COLORS[index % COLORS.length]} />
              )}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;


