import Logo from "./Logo";
import Search from "./Search";

const Navbar = () => {
    return (<nav className="absolute top-0 left-0 flex justify-between items-center px-5 sm:px-10 gap-5  pt-4 w-full z-20 ">
    <Logo />
    <Search />
    <p className="hidden md:block">Sign in</p>
  </nav>  );
}
 
export default Navbar;