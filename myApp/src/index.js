import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.module.css';
import LoginProvider from './provider/LoginContext.jsx';
import AuthProvider from './provider/AuthUser';
import UserIDProvider from './provider/UserIDContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <LoginProvider>
            <AuthProvider>
                <UserIDProvider>
                    <App />
                </UserIDProvider>
            </AuthProvider>
        </LoginProvider>
);
