import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Actors from './pages/Actors';
import Directors from './pages/Directors';
import ChooseRole from './pages/auth/ChooseRole';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ActorDashboard from './pages/actor/ActorDashboard';
import Profile from './pages/actor/Profile';
import ViewProfile from './pages/ViewProfile';
import Portfolio from './pages/actor/Portfolio';
import Auditions from './pages/actor/Auditions';
import Networking from './pages/actor/Networking';
import DirectorDashboard from './pages/director/DirectorDashboard';
import PostAudition from './pages/director/PostAudition';
import Applicants from './pages/director/Applicants';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/choose-role" element={<ChooseRole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/actor/dashboard" element={<ActorDashboard />} />
          <Route path="/actor/profile" element={<Profile />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/actor/portfolio" element={<Portfolio />} />
          <Route path="/actor/auditions" element={<Auditions />} />
          <Route path="/actor/networking" element={<Networking />} />
          <Route path="/director/dashboard" element={<DirectorDashboard />} />
          <Route path="/director/post-audition" element={<PostAudition />} />
          <Route path="/director/applicants" element={<Applicants />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
