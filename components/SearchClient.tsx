"use client";
import {Suspense,useState} from "react";import {useSearchParams} from "next/navigation";import type {Article} from "@/types";import {Card} from "@/components/Ui";
function S({ARTICLES}:{ARTICLES:Article[]}){const sp=useSearchParams();const [q,setQ]=useState(sp.get("q")||"");const [n,setN]=useState(6);
const t=q.toLowerCase().trim();const r=t?ARTICLES.filter(a=>[a.title,a.category,a.author,...a.keywords].join(" ").toLowerCase().includes(t)):[];
return(<><h1 className="mb-4 text-3xl font-bold">Search</h1><form role="search" onSubmit={e=>{e.preventDefault();history.replaceState(null,"",`/search?q=${encodeURIComponent(q)}`)}}><label htmlFor="q" className="sr-only">Search articles</label><input id="q" value={q} onChange={e=>{setQ(e.target.value);setN(6)}} placeholder="Title, category, author, keyword" className="min-h-11 w-full max-w-xl rounded border border-line bg-card px-3"/></form>
<p className="my-3 text-mute" aria-live="polite">{t?`${r.length} result(s)`:"Type to search."}</p>
<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{r.slice(0,n).map(a=><Card key={a.id} a={a}/>)}</div>
{r.length>n&&<button onClick={()=>setN(n+6)} className="mt-5 min-h-11 rounded border border-line px-4">Load more</button>}</>)}
export default function SearchClient({items}:{items:Article[]}){return <Suspense fallback={<p>Loading…</p>}><S ARTICLES={items}/></Suspense>}
