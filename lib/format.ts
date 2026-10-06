export const slugify=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const catSlug=(n:string)=>slugify(n);
export const url=(a:{category:string;slug:string})=>`/news/${catSlug(a.category)}/${a.slug}`;
export const fmt=(d:string)=>new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Kolkata"});
