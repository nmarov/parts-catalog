import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Alert,
  Stack,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';

function Basket({ items, onBasketUpdate, basketId }) {
  useEffect(() => {
    // Update basket items when component mounts
    if (onBasketUpdate) {
      // console.log('Calling onBasketUpdate from Basket component');
      // console.log('Basket ID:', basketId);
      onBasketUpdate();
    }
  }, [onBasketUpdate, basketId]);

  console.log('Basket items:', items);
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.part.price * item.quantity;
    }, 0);
  };

  if (!items.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Your basket is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add some items to your basket to see them here
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/"
          startIcon={<ArrowBackIcon />}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
          Your Basket
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Review your items before checkout
        </Typography>
      </Box>
      
      <Card 
        elevation={0} 
        sx={{ 
          mb: 4,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          borderRadius: 2
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'rgba(46, 125, 50, 0.05)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Part Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Subtotal</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.part.imageUrl ? (
                        <Box 
                          component="img"
                          src={item.part.imageUrl}
                          alt={item.part.name}
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            borderRadius: 1, 
                            mr: 2, 
                            objectFit: 'cover' 
                          }}
                          onError={(e) => {
                            // Replace with colored box on error
                            e.target.style.display = 'none';
                            const parent = e.target.parentNode;
                            if (!parent.querySelector('.placeholder-box')) {
                              const placeholderBox = document.createElement('div');
                              placeholderBox.className = 'placeholder-box';
                              placeholderBox.style.width = '50px';
                              placeholderBox.style.height = '50px';
                              placeholderBox.style.borderRadius = '4px';
                              placeholderBox.style.marginRight = '16px';
                              placeholderBox.style.backgroundColor = '#2e7d32';
                              placeholderBox.style.color = 'white';
                              placeholderBox.style.display = 'flex';
                              placeholderBox.style.alignItems = 'center';
                              placeholderBox.style.justifyContent = 'center';
                              placeholderBox.style.fontWeight = 'bold';
                              placeholderBox.innerHTML = item.part.name.charAt(0);
                              parent.insertBefore(placeholderBox, e.target.nextSibling);
                            }
                          }}
                        />
                      ) : (
                        <Box
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            borderRadius: 1, 
                            mr: 2,
                            bgcolor: '#2e7d32',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.part.name.charAt(0)}
                        </Box>
                      )}
                      {item.part.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label="Category" 
                      size="small" 
                      variant="outlined" 
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${item.part.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={item.quantity} 
                      size="small" 
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      ${(item.part.price * item.quantity).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          component={RouterLink} 
          to="/"
          startIcon={<ArrowBackIcon />}
        >
          Continue Shopping
        </Button>
        
        <Card 
          elevation={0} 
          sx={{ 
            p: 2, 
            minWidth: 300,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            borderRadius: 2
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">${calculateTotal().toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Shipping:</Typography>
              <Typography variant="body1">$0.00</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Total:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
            <Button variant="contained" color="primary" size="large">
              Checkout
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}

export default Basket;
