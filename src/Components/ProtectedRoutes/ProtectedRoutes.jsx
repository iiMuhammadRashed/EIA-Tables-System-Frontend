import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoutes = (props) => {
  const [user, setUser] = useState('');
  const { setUserToken } = useContext(UserContext);
  const Navigate = useNavigate();
  const token = Cookies.get('token');
  
  const allowedToValidator = useCallback(
    (...roles) => {
      return roles.includes(jwtDecode(token).role);
    },
    [token]
  );

  useEffect(() => {
    if (!token) {
      setUserToken(null);
      Navigate('/auth/login');
    }
    axios
      .get('http://localhost:4000/api/v1/auth/tokenValidate', {
        headers: {
          token: token,
        },
      })
      .then(({ data }) => {
        if (data.message === 'success') {
          props.allowedTo
            ? allowedToValidator(...props.allowedTo)
              ? setUser(data.user)
              : Navigate('/')
            : setUser(data.user);
        }
      })
      .catch((err) => {
        console.log('errorProtected', err);
        console.log('token', token);
        console.log('Cookies', Cookies.get('token'));
        Cookies.remove('token');
        setUserToken(null);
        Navigate('/auth/login', { replace: true });
      });
  }, [Navigate, allowedToValidator, props.allowedTo, setUserToken, token]);

  return token ? (
    user === '' ? null : (
      props.children
    )
  ) : (
    <Navigate to='/auth/login' replace={true} />
  );
};

export default ProtectedRoutes;
