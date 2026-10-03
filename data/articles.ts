import fs from "fs";import path from "path";import type {Article} from "@/types";
// Articles live as JSON files in content/articles. Add a file = publish an article.
// Auto-generated drafts go to content/drafts and are NOT published until you move them here.
const dir=path.join(process.cwd(),"content","articles");
export const ARTICLES:Article[]=fs.readdirSync(dir).filter(f=>f.endsWith(".json")).map(f=>JSON.parse(fs.readFileSync(path.join(dir,f),"utf8")) as Article)
 .filter(a=>a.status!=="draft").sort((a,b)=>+new Date(b.publishedAt)-+new Date(a.publishedAt));
