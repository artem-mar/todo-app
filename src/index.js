import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import App from './App';

import './index.css';

const firebaseConfig = {
  apiKey: 'AIzaSyAzs6NLK2mk2taxIZHCzpBSZGYMYbA_4NE',
  authDomain: 'todo-list-7aa15.firebaseapp.com',
  databaseURL: 'https://todo-list-7aa15-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-list-7aa15',
  storageBucket: 'todo-list-7aa15.appspot.com',
  messagingSenderId: '529952818186',
  appId: '1:529952818186:web:fc471120d3cdcc08a70bf3',
  measurementId: 'G-3TNMYQ0CBG',
};
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
