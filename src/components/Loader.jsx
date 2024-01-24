import { loader } from '../assets'
const Loader = ({title}) => (
  <div className='w-full flex justify-center items-center flex-col'>
    <img src={loader} alt='loader' className='w-20 h-20' />
    <h2 className='text-white text-2xl mt-5'>{title}</h2>
  </div>
);

export default Loader;
