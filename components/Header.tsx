"use client";
import Link from "next/link";import {useState,useEffect} from "react";import {CATS,SITE} from "@/data/site";import {LangSelect,useLang,ui} from "@/components/Lang";
// Like BBC: only a few top sections are visible; the 3-line button opens ALL sections. The language menu translates the menu and article text.
const TOP=["breaking-news","india","tamil-nadu","world","business","technology","sports","entertainment"];
export default function Header(){const [open,setOpen]=useState(false);const lang=useLang();
const toggle=()=>{const d=document.documentElement;const n=d.dataset.theme==="dark"?"light":"dark";d.dataset.theme=n;try{localStorage.setItem("theme",n)}catch{}};
useEffect(()=>{try{const t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch{}},[]);
useEffect(()=>{const k=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};window.addEventListener("keydown",k);return()=>window.removeEventListener("keydown",k)},[]);
const top=TOP.map(s=>CATS.find(c=>c.slug===s)).filter(Boolean) as typeof CATS;
return(<header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
<div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3">
<div className="flex items-center gap-3">
<button type="button" className="grid min-h-11 min-w-11 place-items-center rounded border border-line" aria-expanded={open} aria-controls="all-sections" aria-label={open?"Close all sections":"Open all sections"} onClick={()=>setOpen(!open)}>{open?<span aria-hidden>✕</span>:<span aria-hidden className="flex flex-col gap-[5px]"><i className="block h-0.5 w-5 bg-ink"/><i className="block h-0.5 w-5 bg-ink"/><i className="block h-0.5 w-5 bg-ink"/></span>}</button>
<Link href="/" className="font-head text-2xl font-bold sm:text-3xl" aria-label="BubblesEdiy home">Bubbles<span className="text-accent">Ediy</span><span className="block text-xs font-body font-normal text-mute">{SITE.tagline}</span></Link></div>
<div className="flex items-center gap-2"><LangSelect/>
<Link href="/search" aria-label="Search" className="grid min-h-11 min-w-11 place-items-center rounded border border-line">⌕</Link>
<button type="button" onClick={toggle} aria-label="Toggle dark mode" className="min-h-11 min-w-11 rounded border border-line">◐</button></div></div>
<nav aria-label="Top sections" className="border-t border-line"><ul className="mx-auto flex max-w-7xl gap-5 overflow-x-auto whitespace-nowrap px-4">
<li><Link href="/" className="block py-2 text-sm font-semibold hover:text-accent">{ui(lang,"Home")}</Link></li>
{top.map(c=><li key={c.slug}><Link href={`/category/${c.slug}`} className="block py-2 text-sm font-semibold hover:text-accent">{ui(lang,c.name)}</Link></li>)}</ul></nav>
{open&&<div id="all-sections" className="border-t border-line bg-paper"><p className="mx-auto max-w-7xl px-4 pt-3 text-xs font-bold uppercase tracking-wide text-mute">{ui(lang,"All sections")}</p>
<ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 pb-3 sm:grid-cols-3 lg:grid-cols-6">{CATS.map(c=><li key={c.slug}><Link href={`/category/${c.slug}`} className="block py-2 text-sm font-medium hover:text-accent" onClick={()=>setOpen(false)}>{ui(lang,c.name)}</Link></li>)}</ul></div>}</header>)}
