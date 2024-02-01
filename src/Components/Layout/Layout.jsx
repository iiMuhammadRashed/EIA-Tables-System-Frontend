import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='my-20'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
