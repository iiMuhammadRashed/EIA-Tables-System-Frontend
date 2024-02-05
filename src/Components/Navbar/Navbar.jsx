import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Assets/Images/logo.png';
import { UserContext } from '../../Context/UserContext.jsx';
import { useContext } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
  const Navigate = useNavigate();
  const { userToken, setUserToken } = useContext(UserContext);
  const handleLogout = () => {
    Cookies.remove('token');
    Navigate('/');
    setUserToken(null);
  };
  return (
    <header className='flex flex-wrap md:justify-start md:flex-nowrap w-full text-sm py-4 shadow-md bg-[#00000035] backdrop-blur-sm fixed z-50 top-0'>
      <nav
        className='container w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between '
        aria-label='Global'
      >
        <Link
          className='md:order-1 flex-none text-xl font-semibold dark:text-white'
          to='/'
        >
          <img src={Logo} className='h-10 w-10' alt='logo' />
        </Link>
        <div className='md:order-3 flex items-center gap-x-2'>
          <button
            type='button'
            className='md:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
            data-hs-collapse='#navbar-alignment'
            aria-controls='navbar-alignment'
            aria-label='Toggle navigation'
          >
            <svg
              className='hs-collapse-open:hidden flex-shrink-0 w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
            >
              <line x1='3' x2='21' y1='6' y2='6' />
              <line x1='3' x2='21' y1='12' y2='12' />
              <line x1='3' x2='21' y1='18' y2='18' />
            </svg>
            <svg
              className='hs-collapse-open:block hidden flex-shrink-0 w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
            >
              <path d='M18 6 6 18' />
              <path d='m6 6 12 12' />
            </svg>
          </button>
          {userToken !== null ? (
            <button
              type='button'
              className='py-2 px-3 inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent bg-white text-[#203864] hover:bg-slate-200 transition-all'
              onClick={handleLogout}
            >
              تسجيل خروج <i className='fa-solid fa-right-from-bracket'></i>
            </button>
          ) : (
            ''
          )}
        </div>
        <div
          id='navbar-alignment'
          className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:grow-0 md:basis-auto md:block md:order-2'
        >
          <div className='flex flex-col gap-5 mt-5 md:flex-row md:items-center md:mt-0 md:ps-5'>
            {userToken !== null ? (
              <>
                <Link
                  className='font-bold text-gray-200 hover:text-gray-400 text-lg'
                  to='/'
                  aria-current='page'
                >
                  عرض الجداول الدراسية
                </Link>
                <Link
                  className='font-bold text-gray-200 hover:text-gray-400 text-lg'
                  to='/addLectures'
                  aria-current='page'
                >
                  تسكين الجداول
                </Link>
                <Link
                  className='font-bold text-gray-200 hover:text-gray-400 text-lg'
                  to='/Preoccupations'
                  aria-current='page'
                >
                  الإنشغالات
                </Link>
                <Link
                  className='font-bold text-gray-200 hover:text-gray-400 text-lg'
                  to='/dataInput'
                  aria-current='page'
                >
                  إدخال البيانات
                </Link>
              </>
            ) : (
              <Link
                className='font-bold text-gray-200 hover:text-gray-400 text-lg'
                to='/'
                aria-current='page'
              >
                عرض الجداول
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
