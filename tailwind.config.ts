import type { Config } from "tailwindcss";
export default { content:["./app/**/*.tsx","./components/**/*.tsx"], darkMode:["class",'[data-theme="dark"]'],
 theme:{extend:{colors:{ink:"var(--ink)",paper:"var(--paper)",line:"var(--line)",mute:"var(--mute)",accent:"var(--accent)",card:"var(--card)"},
 fontFamily:{head:["Charter","Georgia","Cambria","serif"],body:["system-ui","Segoe UI","Roboto","sans-serif"]}}}} satisfies Config;
