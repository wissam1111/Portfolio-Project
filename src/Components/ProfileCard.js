import { FaFacebook, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function ProfileCard(){
  return (
    <div className="p-8  overflow-hidden  bg-blue-950 text-white flex items-center">
    <div className="px-32 py-4">
      <h6 className="font-bold mb-1">Hello,<span className="text-blue-400"> I'm</span></h6>
      <h2 className="font-bold text-4xl mb-3">Wissam Jamous</h2>
      <p className="text-xl text-blue-300">A Junior Front End Developper</p>
      <div className='flex items-center gap-14 mt-5 hover:'>
      <a href='https://www.facebook.com/wissam jamous' target='_blank'>
      <FaFacebook size="24"/>
      </a>
      <a href='https://www.whatsapp.com/76329268' target='_blank'>
      <FaWhatsapp size="24"/>
      </a>
      <a href='https://www.instagram.com/wissam.jamous' target='_blank'>
      <FaInstagram size="24"/>
      </a>
      <a href='https://www.github.com/wissam1111'>
      <FaGithub size="24"/>
      </a>
      </div>
      </div>
      <img src={require('../Assets/31AWFCkio3L._AC_UF1000,1000_QL80_.jpg')} className="size-72 mx-32"/>
    </div>
  )
}
