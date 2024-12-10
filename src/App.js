import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import GlobalStyles from './styles/GlobalStyles';
import UserForm from './components/UserForm';

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/edit/:userId" element={<UserForm />} />
        <Route path="/create" element={<UserForm />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;