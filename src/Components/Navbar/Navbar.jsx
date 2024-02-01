import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/logo.png';

const Navbar = () => {
  const links = [
    {
      name: 'عرض الجداول',
      path: '/',
    },
    {
      name: 'تسكين الجداول',
      path: '/addLectures',
    },
    {
      name: 'الإنشغالات',
      path: '/Preoccupations',
    },
    {
      name: 'إدخال البيانات',
      path: '/dataInput',
    },
  ];
  return (
    <header className='flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-4 shadow-md backdrop-blur-sm fixed z-50 top-0'>
      <nav
        className='container w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between '
        aria-label='Global'
      >
        <Link
          className='sm:order-1 flex-none text-xl font-semibold dark:text-white'
          to='/'
        >
          <img src={Logo} className='h-10 w-10' alt='logo' />
        </Link>
        <div className='sm:order-3 flex items-center gap-x-2'>
          <button
            type='button'
            className='sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
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
        </div>
        <div
          id='navbar-alignment'
          className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2'
        >
          <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5'>
            {links.map((link) => (
              <Link
                className='font-bold text-gray-200 hover:text-gray-400 text-lg'
                to={link.path}
                aria-current='page'
                key={link.path}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
