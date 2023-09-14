import {AiFillFacebook, AiOutlineInstagram, AiOutlineTwitter, AiFillYoutube} from 'react-icons/ai'

const Footer = () => {
    return ( <div className=' flex flex-col gap-10 py-20 items-center container mx-auto px-5 sm:px-10'>
        <div className="flex items-center gap-5 sm:gap-10 jutify-center">
            <AiFillFacebook className='h-5 w-5' />
            <AiOutlineInstagram className='h-5 w-5' />
            <AiOutlineTwitter className='h-5 w-5' />
            <AiFillYoutube className='h-5 w-5' />
        </div>
        <div className="flex items-center justify-center gap-5 sm:gap-10 text-[#111827] text-lg font-bold">
            <p>Conditions of Use</p>
            <p>Privacy & Policy</p>
            <p>Press Room</p>
        </div>
        <p className="flex items-center justify-center gap-2 sm:gap-10 text-[#6B7280] text-sm md:text-lg font-bold">&copy; 2023 MovieBox by Arowo Enioluwa</p>
    </div> );
}
 
export default Footer;