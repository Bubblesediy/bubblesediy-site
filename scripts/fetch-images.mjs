// Runs before every build. Finds a freely licensed photo (Wikimedia Commons: CC0, CC BY, CC BY-SA, public domain)
// for every article that has no photo yet, DOWNLOADS it into public/images/articles/, and records the credit.
// Never fails the build: on any problem the site falls back to its drawn illustration.
import fs from "fs";import path from "path";
const OK=/^(cc0|cc[ -]by(?!-nc)(?!.*nd)|public domain|pd)/i;
const UA={"User-Agent":"BubblesEdiyBuild/1.0 (bubblesediy@gmail.com)"};
const T=()=>({signal:AbortSignal.timeout(20000),headers:UA});
const CATQ={"breaking-news":"newspaper","india":"India street market","tamil-nadu":"Tamil Nadu temple gopuram","chennai":"Chennai Marina Beach","world":"world map globe","technology":"computer circuit board","business":"stock market trading screen","entertainment":"cinema theatre","sports":"sports stadium","science":"laboratory science","lifestyle":"healthy food vegetables","trending":"city skyline","games":"video game controller","anime":"Akihabara Tokyo","music":"concert stage lights","movies":"cinema auditorium","series":"television set","ott":"television living room"};
const slugify=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h};
let Q={};try{Q=JSON.parse(fs.readFileSync("content/image-queries.json","utf8"))}catch{}
const dir="content/articles",out="public/images/articles",cache={};fs.mkdirSync(out,{recursive:true});
async function search(q){const u=`https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=30&gsrsearch=${encodeURIComponent(q+" filetype:bitmap")}&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1200`;
  const j=await (await fetch(u,T())).json(),res=[];
  for(const p of Object.values(j.query?.pages||{}).sort((x,y)=>(x.index||0)-(y.index||0))){const ii=p.imageinfo?.[0],m=ii?.extmetadata;
    if(!ii||!m||ii.width<900||ii.width<ii.height)continue;const lic=m.LicenseShortName?.value||"";if(!OK.test(lic))continue;
    res.push({url:ii.thumburl||ii.url,credit:`${(m.Artist?.value||"Unknown").replace(/<[^>]+>/g,"").trim().slice(0,80)} / Wikimedia Commons, ${lic}`,page:ii.descriptionurl})}
  return res}
const arts=fs.readdirSync(dir).filter(x=>x.endsWith(".json")).map(f=>{try{return JSON.parse(fs.readFileSync(path.join(dir,f),"utf8"))}catch{return null}}).filter(a=>a&&!a.imageCredit&&a.status!=="draft")
  .sort((a,b)=>+new Date(b.publishedAt)-+new Date(a.publishedAt)).slice(0,60);
for(const a of arts){try{
  const qs=[Q[a.slug],a.imageQuery].filter(Boolean);if(!qs.length)continue;let pick=null;
  for(const q of qs){const r=await search(q);if(r.length){pick=r[hash(a.slug)%Math.min(r.length,6)];break}}
  if(!pick){console.log("no image:",a.slug);continue}
  let url=pick.url;
  try{const r=await fetch(pick.url,T());if(r.ok&&/^image\//.test(r.headers.get("content-type")||"")){const ext=r.headers.get("content-type").includes("png")?"png":"jpg";fs.writeFileSync(`${out}/${a.slug}.${ext}`,Buffer.from(await r.arrayBuffer()));url=`/images/articles/${a.slug}.${ext}`}}catch{}
  cache[a.slug]={...pick,url};console.log("image found:",a.slug)}catch(e){console.log("image lookup failed:",a.slug,e.message)}}
fs.writeFileSync("content/images.json",JSON.stringify(cache,null,1));
