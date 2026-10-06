"use client";
import {useEffect,useState} from "react";import {API} from "@/data/site";
type B={id:string;text:string;url:string;source:string;t:number};
function useBreaking(){const [l,setL]=useState<B[]|null>(null);useEffect(()=>{fetch(API+"/api/breaking").then(r=>r.json()).then(d=>setL(Array.isArray(d)?d:[])).catch(()=>setL([]))},[]);return l}
export default function Ticker(){const l=useBreaking();if(!l||!l.length)return null;const t=l.slice(0,8);
return(<div className="mb-6 flex overflow-hidden border border-line bg-card text-sm" role="region" aria-label="Breaking news ticker"><span className="shrink-0 bg-accent px-3 py-2 font-bold text-white">BREAKING</span><div className="overflow-hidden"><div className="ticker inline-block py-2">{[...t,...t].map((a,i)=><a key={i} href={a.url} rel="noopener noreferrer" className="mx-6" aria-hidden={i>=t.length?true:undefined} tabIndex={i>=t.length?-1:undefined}>{a.text}</a>)}</div></div></div>)}
export function BreakingList(){const l=useBreaking();if(!l)return <p>Loading…</p>;if(!l.length)return <p>No breaking news right now.</p>;
return(<ol className="space-y-3">{l.map(a=><li key={a.id} className="rounded border border-line bg-card p-4"><p className="font-head text-lg font-semibold">{a.text}</p><p className="mt-1 text-sm text-mute">{a.source} · {new Date(a.t).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"numeric",month:"short",hour:"numeric",minute:"2-digit"})} IST · <a className="underline" href={a.url} rel="noopener noreferrer">Read at source</a></p></li>)}</ol>)}
