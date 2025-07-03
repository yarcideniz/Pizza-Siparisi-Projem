import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/siparis");
  };

  return (
    <div className='homepage'>
      <div className='alltext'>
        <h1 className='title'>Teknolojik Yemekler</h1>
        <p className='subtitle'>KOD ACIKTIRIR</p>
        <p className='subtitle'>PİZZA, DOYURUR</p>
        <button className='button' onClick={handleClick}>ACIKTIM</button>
      </div>
    </div>
  );
};

export default Home;
