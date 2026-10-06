import Link from "next/link";import AdUnit from "@/components/AdUnit";import {url,fmt,catSlug} from "@/lib/format";import type {Article} from "@/types";import {SITE} from "@/data/site";
export function Card({a,big}:{a:Article;big?:boolean}){return(<article className="overflow-hidden rounded border border-line bg-card shadow-sm">
<Link href={url(a)}><ArticleArt a={a} priority={big}/></Link>
<div className="p-4"><Link href={`/category/${catSlug(a.category)}`} className="text-sm font-semibold text-accent">{a.category}</Link>
<h3 className={`${big?"text-3xl md:text-4xl":"text-xl"} mt-1 font-bold`}><Link href={url(a)}>{a.title}</Link></h3>
<p className="mt-2 text-mute">{a.excerpt}</p>
<p className="mt-3 text-sm text-mute">{a.author} · <time dateTime={a.publishedAt}>{fmt(a.publishedAt)}</time></p>
<Link href={url(a)} className="mt-3 inline-block min-h-11 py-2 font-semibold text-accent underline">Read more</Link></div></article>)}
// Ad slot hidden until an ad network is connected. To show a labelled slot later, return:
// <aside aria-label="Advertisement" className="my-6 ..."><span>Advertisement</span>{ad code}</aside>
export const Ad=()=><AdUnit/>;
export function Footer(){const L=[["About BubblesEdiy","about"],["Contact","contact"],["Editorial Policy","editorial-policy"],["Corrections Policy","corrections"],["Privacy Policy","privacy"],["Terms of Use","terms"],["Disclaimer","disclaimer"],["Authors","author/bubblesediy-news-desk"],["Credits","credits"],["Sources","sources"],["Advertise With Us","advertise"]];
return(<footer className="mt-12 border-t border-line"><div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-2"><div><p className="font-head text-2xl font-bold">{SITE.name}</p><p className="text-mute">{SITE.tagline}</p><p className="mt-2 text-sm"><a className="underline hover:text-accent" href="mailto:bubblesediy@gmail.com">bubblesediy@gmail.com</a></p></div>
<ul className="grid grid-cols-2 gap-1">{L.map(([n,h])=><li key={h}><Link className="inline-block min-h-8 hover:text-accent" href={"/"+h}>{n}</Link></li>)}</ul></div>
<p className="pb-6 text-center text-sm text-mute">© {new Date().getFullYear()} {SITE.name}</p></footer>)}
export function Cookie(){/* Shown only if SITE.cookiesEnabled is true: this starter sets no cookies. */return SITE.cookiesEnabled?<div role="dialog" aria-label="Cookie consent" className="fixed bottom-0 inset-x-0 bg-card p-4 border-t border-line">This site uses cookies. See our Privacy Policy.</div>:null}
export function JsonLd({d}:{d:object}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(d).replace(/</g,"\\u003c")}}/>}
export const crumbs=(items:[string,string][])=>({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:items.map(([n,u],i)=>({"@type":"ListItem",position:i+1,name:n,item:SITE.url+u}))});


export function ArticleArt({a,priority}:{a:Article;priority?:boolean}){
 return <img src={a.image} alt={`Image for ${a.title}`} loading={priority?"eager":"lazy"} width={1200} height={675} className="aspect-video w-full rounded object-cover"/>}
