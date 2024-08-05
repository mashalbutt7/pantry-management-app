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
          return <LoginPage onLoginSuccess={handleLoginSuccess} />;
        case 'sign-up':
          return <SignUpPage onSignUpSuccess={handleSignUpSuccess} />;
        default:
          return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'add-item':
        return <AddItemPage setCurrentPage={setCurrentPage} />;
      case 'update-item':
        return <UpdateItemPage setCurrentPage={setCurrentPage} />;
      case 'remove-item':
        return <RemoveItemPage setCurrentPage={setCurrentPage} />;
      case 'search-filter-page':
        return <SearchFilterPage setCurrentPage={setCurrentPage} />;
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
