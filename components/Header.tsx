"use client";
import Link from "next/link";import {useState,useEffect} from "react";import {CATS,SITE} from "@/data/site";
export default function Header(){const [open,setOpen]=useState(false);
const toggle=()=>{const d=document.documentElement;const n=d.dataset.theme==="dark"?"light":"dark";d.dataset.theme=n;try{localStorage.setItem("theme",n)}catch{}};
useEffect(()=>{try{const t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch{}},[]);
return(<header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
<div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
<Link href="/" className="font-head text-2xl font-bold sm:text-3xl" aria-label="BubblesEdiy home">Bubbles<span className="text-accent">Ediy</span><span className="block text-xs font-body font-normal text-mute">{SITE.tagline}</span></Link>
<div className="flex items-center gap-2">
<Link href="/search" aria-label="Search" className="min-h-11 min-w-11 grid place-items-center rounded border border-line">⌕</Link>
<button onClick={toggle} aria-label="Toggle dark mode" className="min-h-11 min-w-11 rounded border border-line">◐</button>
<button className="min-h-11 min-w-11 rounded border border-line lg:hidden" aria-expanded={open} aria-controls="nav" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?"✕":"☰"}</button></div></div>
<nav id="nav" aria-label="Main" className={`${open?"block":"hidden"} border-t border-line lg:block`}><ul className="mx-auto flex max-w-7xl flex-col px-4 lg:flex-row lg:flex-wrap lg:gap-5">
{CATS.map(c=><li key={c.slug}><Link href={`/category/${c.slug}`} className="block py-2 text-sm font-medium hover:text-accent" onClick={()=>setOpen(false)}>{c.name}</Link></li>)}</ul></nav></header>)}
