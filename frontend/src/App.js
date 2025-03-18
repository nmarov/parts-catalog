import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Badge,
  Box,
  Paper,
  Divider,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import Catalog from './components/Catalog';
import Basket from './components/Basket';
import axios from 'axios';

function App() {
  const [basketId, setBasketId] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const createBasket = async () => {
      try {
        const response = await axios.post('http://localhost:8081/api/basket');
        setBasketId(response.data.id);
      } catch (error) {
        console.error('Error creating basket:', error);
      }
    };
    createBasket();
  }, []);
  
  const updateBasketItems = useCallback(async () => {
    if (basketId) {
      try {
        console.log('Fetching basket with ID:', basketId);
        const response = await axios.get(`http://localhost:8081/api/basket/${basketId}`);
        console.log('Basket response:', response.data);
        setBasketItems(response.data.items || []);
        console.log('Updated basket items:', response.data.items || []);
      } catch (error) {
        console.error('Error fetching basket:', error);
      }
    }
  }, [basketId]);

  // Update basket items when basketId changes or component mounts
  useEffect(() => {
    if (basketId) {
      updateBasketItems();
    }
  }, [basketId, updateBasketItems]);



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
          <BuildIcon />
        </Avatar>
        <Typography variant="h6" component="div">
          Parts Catalog
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem 
          button 
          component={RouterLink} 
          to="/"
          selected={isActive('/')}
        >
          <ListItemIcon>
            <HomeIcon color={isActive('/') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Catalog" />
        </ListItem>
        <ListItem 
          button 
          component={RouterLink} 
          to="/basket"
          selected={isActive('/basket')}
        >
          <ListItemIcon>
            <Badge badgeContent={basketItems.length} color="secondary">
              <ShoppingCartIcon color={isActive('/basket') ? 'primary' : 'inherit'} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Basket" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
              <BuildIcon />
            </Avatar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Parts Catalog
            </Typography>
          </Box>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
              <Button 
                color={isActive('/') ? 'primary' : 'inherit'}
                component={RouterLink} 
                to="/"
                startIcon={<HomeIcon />}
                variant={isActive('/') ? 'contained' : 'text'}
                sx={{ fontWeight: 500 }}
              >
                Catalog
              </Button>
              <Button
                color={isActive('/basket') ? 'primary' : 'inherit'}
                component={RouterLink}
                to="/basket"
                startIcon={
                  <Badge badgeContent={basketItems.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                }
                variant={isActive('/basket') ? 'contained' : 'text'}
                sx={{ fontWeight: 500 }}
              >
                Basket
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            '& .MuiDrawer-paper': { width: 250 },
            display: { xs: 'block', md: 'none' },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isMobile ? 0 : 0}px)` },
          mt: 8, // Space for the app bar
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<Catalog basketId={basketId} onBasketUpdate={updateBasketItems} />}
              />
              <Route
                path="/basket"
                element={<Basket basketId={basketId} items={basketItems} onBasketUpdate={updateBasketItems} />}
              />
            </Routes>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
