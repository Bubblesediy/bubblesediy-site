import {ARTICLES} from "@/lib/content";import SearchClient from "@/components/SearchClient";
export const metadata={title:"Search",robots:{index:false}};
export default function Page(){return <SearchClient items={ARTICLES}/>}
