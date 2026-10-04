import {libraryImage,LIB_CREDIT} from "@/data/imageLibrary";import fs from "fs";import path from "path";import type {Article} from "@/types";
// Articles live as JSON files in content/articles. Add a file = publish an article.
// content/images.json is created at build time by scripts/fetch-images.mjs (licensed Wikimedia Commons photos).
const dir=path.join(process.cwd(),"content","articles");
let cache:Record<string,{url:string;credit:string;page:string}>={};
try{cache=JSON.parse(fs.readFileSync(path.join(process.cwd(),"content","images.json"),"utf8"))}catch{}
export const ARTICLES:Article[]=fs.readdirSync(dir).filter(f=>f.endsWith(".json")).map(f=>JSON.parse(fs.readFileSync(path.join(dir,f),"utf8")) as Article)
 .filter(a=>a.status!=="draft").map(a=>{const c=cache[a.slug];if(a.imageCredit&&a.image&&!a.image.endsWith(".svg"))return a;if(c)return{...a,image:c.url,imageCredit:c.credit,imageSource:c.page};return{...a,image:libraryImage(a),imageCredit:LIB_CREDIT,imageSource:undefined}})
 .sort((a,b)=>+new Date(b.publishedAt)-+new Date(a.publishedAt));
