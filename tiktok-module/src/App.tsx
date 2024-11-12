import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import Order from './pages/Order';
import Product from './pages/Product';
import UserAccountManager from './pages/UserAccountManager';
import Connector from './pages/Connector';

const App: React.FC = () => {
  return (
    <Router>
      <Box bg="gray.100" minH="100vh">
        {/* Header cố định trên cùng */}
        <Header />

        {/* Nội dung trang */}
        <Container maxW="95%"  pt={4}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/connector" element={<Connector />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<Product />} />
            <Route path="/user-account-manager" element={<UserAccountManager />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
