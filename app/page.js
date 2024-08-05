// MainPage.js
'use client';

import { useState } from 'react';
import HomePage from './home';
import AddItemPage from './addItem';
import UpdateItemPage from './updateItem';
import RemoveItemPage from './removeItem';
import SearchFilterPage from './searchFilterPage';
import SignUpPage from './signup';
import LoginPage from './login';
import { signOut } from 'firebase/auth'; // Import signOut
import { auth } from './firebase'; // Import your Firebase auth configuration

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setCurrentPage('login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
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
        return <HomePage setCurrentPage={setCurrentPage} handleLogout={handleLogout} />;
      case 'add-item':
        return <AddItemPage setCurrentPage={setCurrentPage} />;
      case 'update-item':
        return <UpdateItemPage setCurrentPage={setCurrentPage} />;
      case 'remove-item':
        return <RemoveItemPage setCurrentPage={setCurrentPage} />;
      case 'search-filter-page':
        return <SearchFilterPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} handleLogout={handleLogout} />;
    }
  };

  return (
    <main>
      {renderPage()}
    </main>
  );
}
