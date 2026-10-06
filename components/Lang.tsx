"use client";
import {useEffect,useState} from "react";import {API} from "@/data/site";
export const LANGS=[["en","English"],["ta","தமிழ்"],["hi","हिन्दी"],["te","తెలుగు"],["ml","മലയാളം"],["kn","ಕನ್ನಡ"],["bn","বাংলা"],["mr","मराठी"],["gu","ગુજરાતી"],["ur","اردو"],["pa","ਪੰਜਾਬੀ"],["ar","العربية"],["es","Español"],["fr","Français"],["de","Deutsch"],["pt","Português"],["ru","Русский"],["ja","日本語"],["zh","中文"],["id","Bahasa Indonesia"]] as const;
const RTL=["ar","ur"];
// Menu labels for Tamil and Hindi are built in; other languages show English menu labels but can translate article text.
const UI:Record<string,Record<string,string>>={
 ta:{"Home":"முகப்பு","All sections":"அனைத்து பிரிவுகள்","Breaking News":"முக்கிய செய்திகள்","India":"இந்தியா","Tamil Nadu":"தமிழ்நாடு","Chennai":"சென்னை","World":"உலகம்","Technology":"தொழில்நுட்பம்","Business":"வணிகம்","Entertainment":"பொழுதுபோக்கு","Sports":"விளையாட்டு","Science":"அறிவியல்","Lifestyle":"வாழ்க்கை முறை","Trending":"டிரெண்டிங்","Games":"கேம்ஸ்","Anime":"அனிமே","Music":"இசை","Movies":"திரைப்படங்கள்","Series":"தொடர்கள்","OTT":"ஓடிடி","Videos":"வீடியோக்கள்"},
 hi:{"Home":"होम","All sections":"सभी अनुभाग","Breaking News":"ताज़ा खबर","India":"भारत","Tamil Nadu":"तमिलनाडु","Chennai":"चेन्नई","World":"विश्व","Technology":"प्रौद्योगिकी","Business":"व्यापार","Entertainment":"मनोरंजन","Sports":"खेल","Science":"विज्ञान","Lifestyle":"जीवनशैली","Trending":"ट्रेंडिंग","Games":"गेम्स","Anime":"एनिमे","Music":"संगीत","Movies":"फ़िल्में","Series":"सीरीज़","OTT":"ओटीटी","Videos":"वीडियो"}};
export const ui=(lang:string,k:string)=>UI[lang]?.[k]||k;
const KEY="lang";const get=()=>{try{return localStorage.getItem(KEY)||"en"}catch{return"en"}};
export function setLang(c:string){try{localStorage.setItem(KEY,c)}catch{}window.dispatchEvent(new Event("bubbles-lang"))}
export function useLang(){const [l,setL]=useState("en");useEffect(()=>{setL(get());const f=()=>setL(get());window.addEventListener("bubbles-lang",f);return()=>window.removeEventListener("bubbles-lang",f)},[]);return l}
const cache=new Map<string,Promise<string[]>>();
function translate(lang:string,texts:string[]){const k=lang+"|"+texts.join("\u0001");if(!cache.has(k))cache.set(k,fetch(API+"/api/translate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({lang,texts:texts.slice(0,8)})}).then(r=>r.json()).then(j=>j.ok?[...j.texts,...texts.slice(8)]:Promise.reject()).catch(()=>texts));return cache.get(k)!}
function useT(lang:string,texts:string[]){const key=texts.join("\u0001");const [out,setOut]=useState<string[]|null>(null);
 useEffect(()=>{if(lang==="en"){setOut(null);return}let live=true;translate(lang,texts).then(o=>{if(live)setOut(o)});return()=>{live=false}},[lang,key]); // eslint-disable-line react-hooks/exhaustive-deps
 return lang==="en"?texts:(out||texts)}
export function LangSelect(){const l=useLang();return(<select aria-label="Language" value={l} onChange={e=>setLang(e.target.value)} className="min-h-11 max-w-[8.5rem] rounded border border-line bg-paper px-2 text-sm">{LANGS.map(([c,n])=><option key={c} value={c}>{n}</option>)}</select>)}
type I18=Record<string,{title:string;excerpt:string;content:string[]}>|undefined;
export function ArticleHead({title,excerpt,i18n}:{title:string;excerpt:string;i18n?:I18}){const l=useLang(),h=i18n?.[l],t=useT(h?"en":l,[title,excerpt]),o=h?[h.title,h.excerpt]:t;
 return(<div dir={RTL.includes(l)?"rtl":undefined}><h1 className="text-4xl font-bold md:text-5xl">{o[0]}</h1><p className="mt-3 text-xl text-mute">{o[1]}</p></div>)}
export function ArticleBody({content,i18n,reviewed}:{content:string[];i18n?:I18;reviewed?:boolean}){const l=useLang(),h=i18n?.[l],t=useT(h?"en":l,content),o=h?h.content:t;
 return(<div className={`prose ${l!=="en"?"tr":""}`} dir={RTL.includes(l)?"rtl":undefined}>{o.map((p,k)=><p key={k}>{p}</p>)}
 {l!=="en"&&<p className="text-xs text-mute">{h&&reviewed?"Translated by the BubblesEdiy editors. ":"Machine translation; it may contain errors. "}<button type="button" className="underline" onClick={()=>setLang("en")}>Show the English original</button></p>}</div>)}
