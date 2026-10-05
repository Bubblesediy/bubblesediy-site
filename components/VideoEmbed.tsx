"use client";
import {useState} from "react";import type {Article} from "@/types";
type V=NonNullable<Article["video"]>;
// YouTube/Vimeo load only AFTER the reader presses play (privacy-friendly: youtube-nocookie.com, Vimeo do-not-track). Own MP4 files play directly.
export default function VideoEmbed({v}:{v:V}){
 const [on,setOn]=useState(false);const label=v.title||"Video";
 const src=v.kind==="youtube"?`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`:v.kind==="vimeo"?`https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1`:"";
 const from=v.kind==="youtube"?"YouTube":"Vimeo";
 return(<figure className="my-5"><div className="relative aspect-video w-full overflow-hidden rounded bg-black">
  {v.kind==="file"?<video controls preload="metadata" playsInline poster={v.poster} aria-label={label} className="h-full w-full"><source src={v.src}/>{v.captions&&<track kind="captions" src={v.captions} srcLang="en" label="English" default/>}Your browser cannot play this video.</video>
  :on?<iframe src={src} title={label} className="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>
  :<button type="button" onClick={()=>setOn(true)} aria-label={`Play video: ${label}`} className="absolute inset-0 grid place-items-center text-white" style={v.poster?{backgroundImage:`url(${v.poster})`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}><span className="rounded-full bg-black/70 px-6 py-4 text-3xl">▶</span></button>}
 </div><figcaption className="mt-2 text-xs text-mute">{v.ai&&<strong>AI-generated presenter. </strong>}{label}{v.credit?` · ${v.credit}`:""}{v.kind!=="file"&&` · Loads from ${from} only after you press play.`}</figcaption></figure>)}
