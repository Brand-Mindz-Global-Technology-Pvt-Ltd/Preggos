import { Link } from "react-router-dom";
export function NotFoundPage() { return <main className="px-5 py-24 text-center"><h1 className="font-display text-7xl font-black">Oh, bump.</h1><p className="mt-4 text-navy/60">That page wandered off.</p><Link to="/" className="mt-7 inline-block rounded-full bg-orange px-6 py-4 font-bold text-white">Back home</Link></main>; }
