// app/page.js
'use client';

import { useState } from 'react';
import HomePage from './home';
import AddItemPage from './addItem';
import UpdateItemPage from './updateItem';
import RemoveItemPage from './removeItem';
import SearchFilterPage from './searchFilterPage';
import SignUpPage from './signup';
import LoginPage from './login';

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignUpSuccess = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <LoginPage onLoginSuccess={handleLoginSuccess} setCurrentPage={setCurrentPage} />;
        case 'sign-up':
          return <SignUpPage onSignUpSuccess={handleSignUpSuccess} setCurrentPage={setCurrentPage} />;
        default:
          return <LoginPage onLoginSuccess={handleLoginSuccess} setCurrentPage={setCurrentPage} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'add-item':
        return <AddItemPage />;
      case 'update-item':
        return <UpdateItemPage />;
      case 'remove-item':
        return <RemoveItemPage />;
      case 'search-filter-page':
        return <SearchFilterPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <main>
      {renderPage()}
    </main>
  );
}
