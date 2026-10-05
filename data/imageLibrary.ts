// Real photos chosen by topic from public/images/library (supplied by the publisher).
// They are captioned as representative images: they do not show the actual event.
const POOL:Record<string,number[]>={"india":[22,27,15],"tamil-nadu":[18,6,22],"chennai":[2,9,15],"world":[27,7,25],"technology":[28,26,12],"business":[14,13,19],"entertainment":[1,0,2],"sports":[9,17,10],"science":[7,6,4,17],"lifestyle":[23,16,24,10],"trending":[20,21,11],"breaking-news":[22,27],"games":[26,12,0],"anime":[0,2,1],"music":[11,21,23],"movies":[1,0,2],"series":[1,24,27],"ott":[24,26,25],"videos":[24,26,25]};
const OVER:Record<string,number>={"why-we-have-seasons":17,"getting-around-chennai-public-transport":2,"how-search-engines-rank-web-pages":28,"what-is-inflation-explained":14,"simple-habits-for-better-sleep":23,"cricket-lbw-rule-explained":9,"pongal-four-days-of-the-harvest-festival":18,"lok-sabha-and-rajya-sabha-differences":22,"what-the-un-security-council-does":27};
export const LIB_CREDIT="Representative image from the BubblesEdiy image library; it does not show the actual event.";
export function libraryImage(a:{slug:string;category:string}){
 const s=a.category.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),pool=POOL[s]||POOL.trending;
 let h=7;for(const c of a.slug)h=(h*31+c.charCodeAt(0))>>>0;
 const n=OVER[a.slug]??pool[h%pool.length];return `/images/library/p${String(n).padStart(2,"0")}.jpg`}
