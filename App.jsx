import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const url = "http://20.244.56.144/test/companies";
const acesstkn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzY1OTgzLCJpYXQiOjE3MjA3NjU2ODMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI3ZTQwMTc5LWRjZmQtNDlkMC04OTAzLWYwZWI0OTZkYjA5MyIsInN1YiI6InNhbmNoaXRoMTg5NF9iaXQyNUBtZXBjb2VuZy5hYy5pbiJ9LCJjb21wYW55TmFtZSI6Im1lcGNvIiwiY2xpZW50SUQiOiJiN2U0MDE3OS1kY2ZkLTQ5ZDAtODkwMy1mMGViNDk2ZGIwOTMiLCJjbGllbnRTZWNyZXQiOiJJdGZGTHJwSVVTV0dMSU1ZIiwib3duZXJOYW1lIjoiU2FuY2hpdGggUlMiLCJvd25lckVtYWlsIjoic2FuY2hpdGgxODk0X2JpdDI1QG1lcGNvZW5nLmFjLmluIiwicm9sbE5vIjoiMjFCSVQwNDYifQ.Y-EsoBBRmDIGPup0ATgPJLX7XT5im3DBLOGvEZDGBIU";
const ProductsList = () => {
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        const url = `${url}/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${acesstkn}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const result = await response.json();
            return result; 
        } catch (err) {
            console.error(err);
            setError(err.message);
            return null;
        }
    };

    const handleSearch = async () => {
        setError(null);
        const result = await fetchProducts();
        if (result) {
            setData(result);
        }
    };

    return (
        <div>
          <div>
            <img
              src='https://image4.owler.com/logo/afford-medical_owler_20160302_104400_original.png'
              alt='Affordmed'
              style={{ border: '5px solid #555', marginLeft: '300px' }}
            />
            </div>
            <h1 style={{ color: "#DDA94B", backgroundColor: "#1E4174", textAlign: "center" }}>
              SEARCH YOUR PRODUCT 😉
            </h1>
          
            <TextField
                id="company-name"
                variant="outlined"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                id="category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                SEARCH
            </Button>
            <hr />
              <div>
                <h2>Products:</h2>
                <ul>
                  {data.map((product) => (
                    <li style={{color:"#DDA94B",backgroundColor:"#1E4174"}}>
                      <h3>{product.productName}</h3>
                      <p><strong>PRICE:</strong> ${product.price}</p>
                      <p><strong>RATING:</strong> {product.rating}</p>
                      <p><strong>AVAILABILITY:</strong> {product.availability}</p>
                      <hr></hr>
                    </li>
                  ))}
                </ul>
              </div>
        </div>
    );
};

export default ProductsList;
