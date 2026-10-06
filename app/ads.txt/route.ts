export const dynamic="force-static";
// ads.txt tells ad buyers that your AdSense account may sell ads on this site. Filled in automatically from NEXT_PUBLIC_ADSENSE_CLIENT (for example ca-pub-1234567890123456).
export const GET=()=>{const c=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||"";const id=c.replace(/^ca-/,"");
 return new Response(id?`google.com, ${id}, DIRECT, f08c47fec0942fa0\n`:"# No ad network is configured yet.\n",{headers:{"Content-Type":"text/plain"}})};
