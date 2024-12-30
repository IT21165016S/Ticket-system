import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import Header from "./components/Header";
import ProtectedRoutes from "./page/ProtectedRoutes";
import CreateTicket from "./page/CreateTicket";
import ViewTickets from "./page/viewTickets";
import ViewTicket from "./page/ViewTicket";

import './App.css'

function App() {
  return (
    <>
      <Header />
      <div className="page-container">
        <Routes>
          <Route path="/supportdesk" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User Routes */}
          <Route element={<ProtectedRoutes allowedRoles={['user']} />}>
            <Route path="/new-ticket" element={<CreateTicket />} />
            <Route path="/tickets" element={<ViewTickets />} />
            <Route path="/ticket/:ticketId" element={<ViewTicket />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
            <Route path="/tickets" element={<ViewTickets />} />
            <Route path="/ticket/:ticketId" element={<ViewTicket />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}


export default App;
