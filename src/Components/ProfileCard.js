import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';

export default function ProfileCard(){
  return (
    <div className="p-8 bg-blue-950 text-white flex flex-col md:flex-row items-center justify-around">
     <div className="flex flex-col items-center md:items-start md:px-16 py-4">
      <h6 className="font-bold mb-1">Hello,<span className="text-blue-400"> I'm</span></h6>
      <h2 className="font-bold text-4xl mb-3">Wissam Jamous</h2>
      <p className="text-xl text-blue-300">A Junior Front End Developper</p>
      <div className='flex items-center gap-24 mt-5 hover:'>
      <a href='https://www.facebook.com/wissam.jamous.1?mibextid=ZbWKwL' target='_blank'>
      <FaFacebook size="24"/>
      </a>
      <a href='https://www.instagram.com/wissam.jamous' target='_blank'>
      <FaInstagram size="24"/>
      </a>
      <a href='https://www.github.com/wissam1111'>
      <FaGithub size="24"/>
      </a>
      </div>
      </div>
      <div className="flex justify-center md:ml-16">
        <img
          src={require('../Assets/31AWFCkio3L._AC_UF1000,1000_QL80_.jpg')}
          alt="Profile"
          className="w-72 h-auto rounded-full object-cover"
        />
      </div>
    </div>
  )
}


