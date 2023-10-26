import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface TemporaryHomeProps {
    setLoggedIn: (value: boolean) => void;
    setIsAdmin: (value: boolean) => void;
  }

function TemporaryHome({ setLoggedIn, setIsAdmin }: TemporaryHomeProps ) {
  const navigate = useNavigate();

  const goToCustomer = () => {
    navigate('/customer');
  };

  const goToDashboardAsAdmin = () => {
    setIsAdmin(true);
    setLoggedIn(true);
    navigate('/services');
  };

  const goToDashboardAsUser = () => {
    setIsAdmin(false);
    setLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div>
      <Button className='mx-1' onClick={goToCustomer}>Go to Customer</Button>
      <Button className='mx-1'onClick={goToDashboardAsAdmin}>Go to Dashboard as Admin</Button>
      <Button className='mx-1'onClick={goToDashboardAsUser}>Go to Dashboard as User</Button>
    </div>
  );
}

export default TemporaryHome;
