import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import ShowAllTables from './Components/ShowAllTables/ShowAllTables.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import AddLectures from './Components/addLectures/addLectures.jsx';
import DataInput from './Components/DataInput/dataInput.jsx';
import Preoccupations from './Components/Preoccupations/Preoccupations.jsx';
import { Toaster } from 'react-hot-toast';

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
      { path: '/auth/register', element: <Register /> },
      { path: '/addLectures', element: <AddLectures /> },
      { path: '/preoccupations', element: <Preoccupations /> },
      { path: '/dataInput', element: <DataInput /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
