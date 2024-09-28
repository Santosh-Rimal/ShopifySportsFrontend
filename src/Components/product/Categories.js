import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbCategoryMinus } from "react-icons/tb";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories');
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  if (!categories.length) {
    return <div>Loading...</div>;
  }

  const filterCategory = (category) => {
    props.fetchProductsByCategory(category.id);
    console.log(category);
  };

  return (
    <div className="relative group">
      <button className="flex items-center px-2 hover:text-slate-200 px-10 pb-2 text-sm font-semibold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat">
        <span className='flex'><TbCategoryMinus className='h-4 w-4' />ALL Categories</span>
      </button>
      <div className="absolute z-10 hidden bg-grey-200 group-hover:block">
        <div className="px-2 pt-2 pb-4 bg-white bg-gray-200 shadow-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p>
              <div className="relative grid select-none items-center whitespace-nowrap rounded-lg border-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-700">
                <span onClick={props.fetchData} className="text-gray-500 hover:bg-slate-200 p-1 rounded-lg">ALL</span>
              </div>
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`relative grid select-none items-center whitespace-nowrap rounded-lg border-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-700`}
                >
                  <span className="text-gray-500 hover:bg-slate-200 p-1 rounded-lg" onClick={() => filterCategory(category)}>
                    {category.category}
                  </span>
                </div>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
