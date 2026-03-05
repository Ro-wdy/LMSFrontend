import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default LandingLayout;
