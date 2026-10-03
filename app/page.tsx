import Link from "next/link";import {Card,Ad,Newsletter} from "@/components/Ui";import {ARTICLES,CATS,byCat,url} from "@/lib/content";
export default function Home(){const [h,...rest]=ARTICLES;const side=rest.slice(0,3);const tick=ARTICLES.slice(0,5);
return(<>
<div className="mb-6 flex overflow-hidden border border-line bg-card text-sm" role="region" aria-label="Breaking news ticker (demo)"><span className="shrink-0 bg-accent px-3 py-2 font-bold text-white">DEMO</span><div className="overflow-hidden"><div className="ticker inline-block py-2">{[...tick,...tick].map((a,i)=><Link key={i} href={url(a)} className="mx-6" aria-hidden={i>=tick.length?true:undefined} tabIndex={i>=tick.length?-1:undefined}>{a.title}</Link>)}</div></div></div>
<section className="grid gap-6 lg:grid-cols-3"><div className="lg:col-span-2"><Card a={h} big/></div><div className="grid gap-4">{side.map(a=><Card key={a.id} a={a}/>)}</div></section>
<Ad/>
<section><h2 className="mb-4 text-2xl font-bold">Latest News</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{ARTICLES.map(a=><Card key={a.id} a={a}/>)}</div></section>
<div className="mt-10 grid gap-8 lg:grid-cols-3"><div className="space-y-8 lg:col-span-2">
{["india","tamil-nadu","chennai","technology","business","entertainment","sports","world"].map(s=>{const c=CATS.find(x=>x.slug===s)!;const l=byCat(s).slice(0,3);return(<section key={s} className="border-t-2 border-ink pt-3"><div className="mb-3 flex items-baseline justify-between"><h2 className="text-2xl font-bold">{c.name}</h2><Link href={`/category/${s}`} className="min-h-11 py-2 font-semibold text-accent underline">View more</Link></div>
{l.length?<div className="grid gap-4 sm:grid-cols-2">{l.map(a=><Card key={a.id} a={a}/>)}</div>:<p className="text-mute">No articles yet.</p>}</section>)})}</div>
<aside aria-labelledby="tr"><h2 id="tr" className="mb-3 border-t-2 border-ink pt-3 text-2xl font-bold">Trending</h2><ol className="list-decimal space-y-3 pl-6">{ARTICLES.slice(0,5).map(a=><li key={a.id}><Link className="font-head font-semibold hover:text-accent" href={url(a)}>{a.title}</Link></li>)}</ol><Ad/></aside></div>
<Newsletter/></>)}
