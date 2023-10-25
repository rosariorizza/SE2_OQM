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
    navigate('/dashboard');
  };

  const goToDashboardAsUser = () => {
    setIsAdmin(false);
    setLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div>
      <button onClick={goToCustomer}>Go to Customer</button>
      <button onClick={goToDashboardAsAdmin}>Go to Dashboard as Admin</button>
      <button onClick={goToDashboardAsUser}>Go to Dashboard as User</button>
    </div>
  );
}

export default TemporaryHome;
