"use client";
import {useEffect} from "react";
// Shows a Google AdSense display ad only when NEXT_PUBLIC_ADSENSE_CLIENT and NEXT_PUBLIC_ADSENSE_SLOT are set at build time. Otherwise renders nothing.
const CLIENT=process.env.NEXT_PUBLIC_ADSENSE_CLIENT,SLOT=process.env.NEXT_PUBLIC_ADSENSE_SLOT;
export default function AdUnit(){
 useEffect(()=>{if(!CLIENT||!SLOT)return;try{((window as unknown as {adsbygoogle?:unknown[]}).adsbygoogle=(window as unknown as {adsbygoogle?:unknown[]}).adsbygoogle||[]).push({})}catch{}},[]);
 if(!CLIENT||!SLOT)return null;
 return(<aside aria-label="Advertisement" className="my-6 text-center"><p className="mb-1 text-xs text-mute">Advertisement</p>
 <ins className="adsbygoogle" style={{display:"block"}} data-ad-client={CLIENT} data-ad-slot={SLOT} data-ad-format="auto" data-full-width-responsive="true"/></aside>)}
