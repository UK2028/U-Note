import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='flex justify-center border-t border-slate-600 py-4'>
      <span>© 2030 <Link to="/" className='text-lg underline'>U-Note</Link>. All Rights Reserved.</span>
    </div>
  )
}
