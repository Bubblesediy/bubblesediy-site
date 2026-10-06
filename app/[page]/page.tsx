import {PAGES,SITE} from "@/data/site";import {ContactForm} from "@/components/Forms";
export const dynamicParams=false;export const generateStaticParams=()=>Object.keys(PAGES).map(page=>({page}));
export function generateMetadata({params}:{params:{page:string}}){const p=PAGES[params.page];return{title:p.title,description:p.body[0].slice(0,150),alternates:{canonical:`${SITE.url}/${params.page}`}}}
export default function P({params}:{params:{page:string}}){const p=PAGES[params.page];
return(<div className="mx-auto max-w-3xl"><h1 className="mb-4 text-4xl font-bold">{p.title}</h1><div className="prose">{p.body.map((t,i)=><p key={i}>{t}</p>)}</div>
{params.page==="contact"&&<ContactForm/>}</div>)}
