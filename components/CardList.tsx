"use client";
import {useState} from "react";import {Card} from "@/components/Ui";import type {Article} from "@/types";
export default function CardList({items,step=9}:{items:Article[];step?:number}){const [n,setN]=useState(step);
return(<><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.slice(0,n).map(a=><Card key={a.id} a={a}/>)}</div>
{items.length>n&&<button onClick={()=>setN(n+step)} className="mt-6 min-h-11 rounded border border-line px-5">Load more articles</button>}</>)}
