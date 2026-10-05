import VideoEmbed from "@/components/VideoEmbed";
import Ticker from "@/components/Breaking";
import Link from "next/link";import {NewsletterForm} from "@/components/Forms";import {Card,Ad} from "@/components/Ui";import {ARTICLES,CATS,byCat,url} from "@/lib/content";
export default function Home(){const [h,...rest]=ARTICLES;const side=rest.slice(0,3);const tick=ARTICLES.slice(0,5);
return(<>
<Ticker/>
<section className="grid gap-6 lg:grid-cols-3"><div className="lg:col-span-2"><Card a={h} big/></div><div className="grid gap-4">{side.map(a=><Card key={a.id} a={a}/>)}</div></section>
<Ad/>
{ARTICLES.find(a=>a.video)&&(()=>{const v=ARTICLES.find(a=>a.video)!;return(<section className="mb-8"><h2 className="mb-3 text-2xl font-bold">Video news</h2><div className="mx-auto max-w-3xl"><VideoEmbed v={v.video!}/><p className="font-head text-xl font-bold"><Link href={url(v)}>{v.title}</Link></p></div></section>)})()}
<section><h2 className="mb-4 text-2xl font-bold">Latest News</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{ARTICLES.map(a=><Card key={a.id} a={a}/>)}</div></section>
<div className="mt-10 grid gap-8 lg:grid-cols-3"><div className="space-y-8 lg:col-span-2">
{["india","tamil-nadu","chennai","technology","business","entertainment","sports","world","games","anime","music","movies","series","ott"].map(s=>{const c=CATS.find(x=>x.slug===s)!;const l=byCat(s).slice(0,3);if(!l.length)return null;return(<section key={s} className="border-t-2 border-ink pt-3"><div className="mb-3 flex items-baseline justify-between"><h2 className="text-2xl font-bold">{c.name}</h2><Link href={`/category/${s}`} className="min-h-11 py-2 font-semibold text-accent underline">View more</Link></div>
{l.length?<div className="grid gap-4 sm:grid-cols-2">{l.map(a=><Card key={a.id} a={a}/>)}</div>:<p className="text-mute">No articles yet.</p>}</section>)})}</div>
<aside aria-labelledby="tr"><h2 id="tr" className="mb-3 border-t-2 border-ink pt-3 text-2xl font-bold">Trending</h2><ol className="list-decimal space-y-3 pl-6">{ARTICLES.slice(0,5).map(a=><li key={a.id}><Link className="font-head font-semibold hover:text-accent" href={url(a)}>{a.title}</Link></li>)}</ol><Ad/></aside></div>
<NewsletterForm/></>)}
