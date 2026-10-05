import Link from "next/link";
export const metadata={title:"Page not found",robots:{index:false}};
export default function NF(){return(<div className="py-16 text-center"><h1 className="text-4xl font-bold">Page not found</h1><p className="mt-3 text-mute">The page you asked for doesn't exist or has moved.</p><p className="mt-5"><Link className="font-semibold text-accent underline" href="/">Go to the homepage</Link> or <Link className="font-semibold text-accent underline" href="/search">search articles</Link>.</p></div>)}
