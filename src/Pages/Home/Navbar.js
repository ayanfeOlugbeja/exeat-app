import logo from './../../Images/logo.png';
const Navbar = () => {
  return (
    <div className='navBar  w-[100%] h-[12vh] '>
      <div className='navElements  w-[70%] h-[100%] flex flex-row justify-between mx-auto items-center '>
        <div className='w-[13%] flex flex-row items-center justify-around'>
          <img
            src={logo}
            alt='logo'
            className='w-[55px] h-[55px] rounded-2xl'
            style={{ border: '2px solid white' }}
          />
          <h2 className='font-semibold tracking-widest'>GVU</h2>
        </div>
        <div className='font-semibold text-xl tracking-wide'>Menu</div>
      </div>
    </div>
  );
};

export default Navbar;
