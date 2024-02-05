import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ShowAllTables from './Components/ShowAllTables/ShowAllTables';
import NotFound from './Components/NotFound/NotFound';
import AddLectures from './Components/AddLectures/AddLectures';
import DataInput from './Components/DataInput/DataInput';
import Preoccupations from './Components/Preoccupations/Preoccupations';
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { UserContext } from './Context/UserContext';

let routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ShowAllTables />,
      },
      { path: '/auth/login', element: <Login /> },
      {
        path: '/auth/register',
        element: (
          <ProtectedRoutes allowedTo={['admin']}>
            <Register />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/addLectures',
        element: (
          <ProtectedRoutes>
            <AddLectures />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/preoccupations',
        element: (
          <ProtectedRoutes>
            <Preoccupations />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/dataInput',
        element: (
          <ProtectedRoutes>
            <DataInput />
          </ProtectedRoutes>
        ),
      },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  const { setUserToken } = useContext(UserContext);
  const token = Cookies.get('token');
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:4000/api/v1/auth/tokenValidate', {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => {
          if (data.message === 'success') {
            setUserToken(token);
          }
        })
        .catch((err) => {
          console.log('errorApp', err);
          setUserToken(null);
          Cookies.remove('token');
        });
    }
  }, [setUserToken, token]);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
