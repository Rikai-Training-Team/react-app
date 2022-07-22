import Navbar from './layout/navbar/Navbar.jsx';
import ProductComponent from './layout/productComponent/ProductComponent.jsx';
import Sidebar from './layout/sidebar/Sidebar.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import { instance } from './api/axios.js';
import ToastComponent from './layout/toast/ToastComponent.jsx';

function App() {
  const [error, setError] = useState('');
  const [result, setResult] = useState([]);
  const [stringResult, setStringResult] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get('/products');
        if (response.data.length > 0) {
          setProducts(response.data);
          // setResult(response.data);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchProducts();
  }, [setError]);
  return (
    <div>
      <Navbar products={products} result={result} setResult={setResult} />
      <div style={{ display: 'flex' }}>
        <Sidebar
          result={result}
          stringResult={stringResult}
          selectedBrands={selectedBrands}
          selectedType={selectedType}
          selectedStar={selectedStar}
          setSelectedBrands={setSelectedBrands}
          setSelectedType={setSelectedType}
          setSelectedStar={setSelectedStar}
          products={products}
          setProducts={setProducts}
          setResult={setResult}
          setStringResult={setStringResult}
          setError={setError}
        />
        <ProductComponent
          products={products}
          setProducts={setProducts}
          result={result}
          setResult={setResult}
          stringResult={stringResult}
          setStringResult={setStringResult}
        />
      </div>
      <ToastComponent />
    </div>
  );
}

export default App;
