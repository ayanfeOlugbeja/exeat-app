import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='not-found'>
      <h2>PAGE NOT FOUND!!!!!</h2>
      <p>Sorry page not found</p>
      <Link to='/passi'>GOTO homepage</Link>
    </div>
  );
};

export default NotFound;
