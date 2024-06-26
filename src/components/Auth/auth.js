import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function checkAdmin() {
    if(!localStorage.getItem('token')) return Promise.resolve(false);
    return fetch('http://localhost:8081/api/admin/isAdmin', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        return response;
      })
      .then(data => data.status === 200)
      .catch(error => {
        console.error('Error:', JSON.stringify(error));
        return false;
      });
}

export function withAdminCheck(WrappedComponent) {
  return function(props) {
    const [isAdmin, setIsAdmin] = useState(null);
    const userNavigate = useNavigate();

    useEffect(() => {
      checkAdmin().then(setIsAdmin);
    }, []);

    useEffect(() => {
      if (isAdmin === false) {
        userNavigate('/main');
      }
    }, [isAdmin, userNavigate]);

    if (isAdmin === null) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
}