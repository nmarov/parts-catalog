import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import axios from 'axios';

function Catalog({ basketId, onBasketUpdate }) {
  const [categories, setCategories] = useState([]);
  const [parts, setParts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchParts = async () => {
      try {
        let url = 'http://localhost:8081/api/parts';
        if (selectedCategory) {
          url = `http://localhost:8081/api/parts/category/${selectedCategory}`;
        }
        const response = await axios.get(url);
        setParts(response.data);
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    };
    fetchParts();
  }, [selectedCategory]);

  const handleAddToBasket = async (partId) => {
    try {
      await axios.post(
        `http://localhost:8081/api/basket/${basketId}/items`,
        null,
        {
          params: {
            partId,
            quantity: quantities[partId] || 1
          }
        }
      );
      onBasketUpdate();
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  // No need for client-side filtering anymore as we're fetching filtered data from the server

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
          Parts Catalog
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Browse our selection of high-quality windsurf parts and accessories
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <CategoryIcon color="primary" sx={{ mr: 2 }} />
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="category-select-label">Filter by Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Filter by Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Box>

      {parts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No parts found in this category
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {parts.map((part) => (
            <Grid item xs={12} sm={6} md={4} key={part.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {part.imageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={part.imageUrl}
                    alt={part.name}
                    sx={{
                      objectFit: 'cover',
                      bgcolor: 'rgba(46, 125, 50, 0.1)',
                    }}
                    onError={(e) => {
                      // Replace with SVG on error
                      e.target.style.display = 'none';
                      const parent = e.target.parentNode;
                      if (!parent.querySelector('svg')) {
                        const svgContainer = document.createElement('div');
                        svgContainer.style.height = '200px';
                        svgContainer.style.display = 'flex';
                        svgContainer.style.alignItems = 'center';
                        svgContainer.style.justifyContent = 'center';
                        svgContainer.style.backgroundColor = '#2e7d32';
                        svgContainer.style.color = 'white';
                        svgContainer.style.fontWeight = 'bold';
                        svgContainer.innerHTML = part.name;
                        parent.appendChild(svgContainer);
                      }
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: '#2e7d32',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      textAlign: 'center',
                      padding: 2
                    }}
                  >
                    {part.name}
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {part.name}
                    </Typography>
                    <Chip 
                      label={`$${part.price}`} 
                      color="primary" 
                      size="small" 
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {part.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={part.category ? part.category.name : 'Category'} 
                      size="small" 
                      variant="outlined" 
                      sx={{ fontSize: '0.75rem' }}
                    />
                    <Typography variant="body2" color={part.stockQuantity > 5 ? 'success.main' : 'warning.main'}>
                      {part.stockQuantity > 0 ? `${part.stockQuantity} in stock` : 'Out of stock'}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                  <TextField
                    type="number"
                    label="Qty"
                    size="small"
                    InputProps={{ 
                      inputProps: { min: 1, max: part.stockQuantity },
                      sx: { width: '80px' }
                    }}
                    value={quantities[part.id] || 1}
                    onChange={(e) =>
                      setQuantities({
                        ...quantities,
                        [part.id]: parseInt(e.target.value) || 1
                      })
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => handleAddToBasket(part.id)}
                    disabled={part.stockQuantity === 0}
                  >
                    Add to Basket
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Catalog;
