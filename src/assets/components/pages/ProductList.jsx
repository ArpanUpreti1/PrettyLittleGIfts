import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5028/api/Products', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5028/api/Products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">All Products</h2>
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.N</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/edit-product/${product.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
