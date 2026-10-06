"use client";
import {useState} from "react";import {API} from "@/data/site";
async function send(path:string,body:object){try{const r=await fetch(API+path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const j=await r.json().catch(()=>({}));return r.ok&&j.ok?{ok:true,msg:""}:{ok:false,msg:j.error||"Something went wrong. Please try again."}}catch{return{ok:false,msg:"Could not connect. Please try again later."}}}
const inp="min-h-11 w-full rounded border border-line bg-paper px-3";
type S="idle"|"busy"|"ok"|"err";
export function NewsletterForm(){const [s,set]=useState<S>("idle");const [m,setM]=useState("");
return(<section className="my-10 rounded border border-line bg-card p-6" aria-labelledby="nl-h"><h2 id="nl-h" className="text-2xl font-bold">Subscribe to BubblesEdiy News</h2>
<p className="text-mute">Get our latest articles by email. We use your address only for BubblesEdiy updates, and remove it on request.</p>
<form className="mt-3 flex flex-wrap gap-2" onSubmit={async e=>{e.preventDefault();const f=e.currentTarget;const d=new FormData(f);set("busy");const r=await send("/api/subscribe",{email:d.get("email"),website:d.get("website")});if(r.ok){set("ok");f.reset()}else{set("err");setM(r.msg)}}}>
<label className="sr-only" htmlFor="nl-email">Email address</label><input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inp+" flex-1"}/>
<input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
<button disabled={s==="busy"} className="min-h-11 rounded bg-accent px-4 font-semibold text-white disabled:opacity-60">{s==="busy"?"Subscribing…":"Subscribe"}</button></form>
<p className="mt-2 text-sm" role="status" aria-live="polite">{s==="ok"?"Thank you. You are subscribed.":s==="err"?m:""}</p></section>)}
export function ContactForm(){const [s,set]=useState<S>("idle");const [m,setM]=useState("");
return(<form className="mt-6 grid gap-3" onSubmit={async e=>{e.preventDefault();const f=e.currentTarget;const d=new FormData(f);set("busy");const r=await send("/api/contact",{name:d.get("name"),email:d.get("email"),message:d.get("message"),website:d.get("website")});if(r.ok){set("ok");f.reset()}else{set("err");setM(r.msg)}}}>
<label>Name<input name="name" required maxLength={100} className={inp+" block"}/></label>
<label>Email<input name="email" type="email" required className={inp+" block"}/></label>
<label>Message<textarea name="message" rows={5} required maxLength={3000} className="block w-full rounded border border-line bg-paper px-3"/></label>
<input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
<button disabled={s==="busy"} className="min-h-11 rounded bg-accent px-4 font-semibold text-white disabled:opacity-60">{s==="busy"?"Sending…":"Send message"}</button>
<p role="status" aria-live="polite">{s==="ok"?"Thank you. Your message was sent.":s==="err"?m:""}</p></form>)}
