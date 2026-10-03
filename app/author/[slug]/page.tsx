import {AUTHORS,byAuthor} from "@/lib/content";import {Card} from "@/components/Ui";import {SITE} from "@/data/site";
export const dynamicParams=false;export const generateStaticParams=()=>AUTHORS.map(a=>({slug:a.slug}));
export function generateMetadata({params}:{params:{slug:string}}){const a=AUTHORS.find(x=>x.slug===params.slug)!;return{title:a.name,description:a.bio,alternates:{canonical:`${SITE.url}/author/${a.slug}`}}}
export default function Author({params}:{params:{slug:string}}){const a=AUTHORS.find(x=>x.slug===params.slug)!;
return(<><div className="mb-6 flex items-center gap-4"><div aria-hidden className="grid h-20 w-20 place-items-center rounded-full bg-accent text-3xl text-white">B</div><div><h1 className="text-3xl font-bold">{a.name}</h1><p className="max-w-prose text-mute">{a.bio}</p></div></div>
<h2 className="mb-3 text-2xl font-bold">Articles</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{byAuthor(a.slug).map(x=><Card key={x.id} a={x}/>)}</div></>)}
