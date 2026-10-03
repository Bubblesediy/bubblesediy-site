import {CATS,byCat} from "@/lib/content";import {Ad,JsonLd,crumbs} from "@/components/Ui";import CardList from "@/components/CardList";import {SITE} from "@/data/site";
export const dynamicParams=false;export const generateStaticParams=()=>CATS.map(c=>({slug:c.slug}));
export function generateMetadata({params}:{params:{slug:string}}){const c=CATS.find(x=>x.slug===params.slug)!;return{title:c.name,description:c.description,alternates:{canonical:`${SITE.url}/category/${c.slug}`}}}
export default function Cat({params}:{params:{slug:string}}){const c=CATS.find(x=>x.slug===params.slug)!;const l=byCat(c.slug);
return(<><JsonLd d={crumbs([["Home","/"],[c.name,`/category/${c.slug}`]])}/><h1 className="text-4xl font-bold">{c.name}</h1><p className="mb-6 text-mute">{c.description}</p><Ad/>
{l.length?<CardList items={l}/>:<p>No articles in this category yet.</p>}</>)}
