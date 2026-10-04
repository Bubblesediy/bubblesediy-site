import {SITE,PAGES} from "@/data/site";import {ARTICLES,CATS,url} from "@/lib/content";export const dynamic="force-static";
export const GET=()=>{const u=["/",...CATS.map(c=>"/category/"+c.slug),...Object.keys(PAGES).map(p=>"/"+p),"/author/bubblesediy-news-desk","/credits",...ARTICLES.filter(a=>!a.demo).map(url)];
return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${u.map(p=>`<url><loc>${SITE.url}${p}</loc></url>`).join("")}</urlset>`,{headers:{"Content-Type":"application/xml"}})};
