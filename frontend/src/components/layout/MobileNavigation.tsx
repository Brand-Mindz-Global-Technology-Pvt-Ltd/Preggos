import { Link } from "react-router-dom";
export function MobileNavigation({ close }: { close: () => void }) { return <nav className="grid gap-5 px-6 py-6 font-bold md:hidden"><Link to="/shop" onClick={close}>Shop</Link><a href="/#needs" onClick={close}>Shop by need</a><Link to="/about" onClick={close}>Our story</Link><Link to="/contact" onClick={close}>Contact</Link></nav>; }
