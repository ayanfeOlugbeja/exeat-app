import { RotateLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='loader fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center'>
      <RotateLoader
        color='#0f3460'
        size={20}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export default Loader
