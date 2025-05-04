import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NumberTools from './pages/NumberTools';
import TimeTools from './pages/TimeTools';
import AddressTools from './pages/AddressTools';
import DevTools from './pages/DevTools';
import NotFound from './pages/NotFound';
import FormDemo from './pages/FormDemo';
import ButtonDemo from './pages/ButtonDemo';
import ToastDemo from './pages/ToastDemo';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>歡迎使用 2ndShot Web3 Utils</h1>} />
          <Route path="/number-tools" element={<NumberTools />} />
          <Route path="/time-tools" element={<TimeTools />} />
          <Route path="/address-tools" element={<AddressTools />} />
          <Route path="/dev-tools" element={<DevTools />} />
          <Route path="/form-demo" element={<FormDemo />} />
          <Route path="/button-demo" element={<ButtonDemo />} />
          <Route path="/toast-demo" element={<ToastDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
