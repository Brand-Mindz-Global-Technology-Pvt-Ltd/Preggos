import { Link } from "react-router-dom";
export function EmptyState({ message }: { message: string }) { return <div className="mt-10 rounded-[2rem] bg-white p-12 text-center"><p className="text-navy/60">{message}</p><Link to="/shop" className="mt-6 inline-block rounded-full bg-orange px-6 py-3 font-bold text-white">Shop the collection</Link></div>; }
