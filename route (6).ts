import {SITE} from "@/data/site";export const dynamic="force-static";
export const GET=()=>new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\nSitemap: ${SITE.url}/news-sitemap.xml\n`,{headers:{"Content-Type":"text/plain"}});
