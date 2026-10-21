import { createContext, useContext, useEffect, useState } from "react";
type WishlistValue = { ids: string[]; toggle: (id: string) => void; has: (id: string) => boolean };
const WishlistContext = createContext<WishlistValue | null>(null);
const readIds = (): string[] => { try { const parsed: unknown = JSON.parse(localStorage.getItem("preggos-wishlist") ?? "[]"); return Array.isArray(parsed) && parsed.every(x => typeof x === "string") ? parsed : []; } catch { return []; } };
export function WishlistProvider({ children }: { children: React.ReactNode }) { const [ids, setIds] = useState<string[]>(readIds); useEffect(() => localStorage.setItem("preggos-wishlist", JSON.stringify(ids)), [ids]); const value = { ids, toggle: (id: string) => setIds(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]), has: (id: string) => ids.includes(id) }; return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>; }
export const useWishlist = () => { const context = useContext(WishlistContext); if (!context) throw new Error("useWishlist must be used inside WishlistProvider"); return context; };
