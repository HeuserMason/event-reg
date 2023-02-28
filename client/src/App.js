//import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout, Space } from 'antd';

import Header from './components/Header';

import Landing from './pages/Landing';
import Events from "./pages/Events";
import PurchaseForm from "./pages/PurchaseForm";
import ThankYou from "./pages/ThankYou";

import Footer from './components/Footer';

function App() {

    return ( 
        
        <BrowserRouter>
            <Layout>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/purchaseForm" element={<PurchaseForm />} />
                    <Route path="/events/thank_you" element={<ThankYou />} />
                </Routes>
                <Footer />
            </Layout>
        </BrowserRouter>
    );
}

export default App;