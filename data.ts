export type Song={title:string;artist:string;url:string;audioId?:string};
export type Game={name:string;hours:number;appid?:number;recent?:number};
export type Profile={name:string;bio:string;specialty:string;piano:string;steamUrl:string;steamUpdated?:string;songs:Song[];games:Game[]};
export type Photo={id:string;place:string;caption:string;date:string;src:string};
export const initialProfile:Profile={"name":"Tomori Nao","bio":"在数学里寻找秩序，在音乐里收藏心情。\n也喜欢游戏、动画，和偶尔出发的旅行。","specialty":"数学 · 几何分析","piano":"钢琴学习中","steamUrl":"https://steamcommunity.com/profiles/76561199444255437/","steamUpdated":"2026-10-18T12:50:00Z","songs":[],"games":[{"name":"Street Fighter 6","hours":222,"appid":1364780},{"name":"Plants vs. Zombies: Game of the Year","hours":0,"appid":3590},{"name":"Slay the Spire","hours":128.4}]};
export const places=['青岛','洛阳','敦煌','黄山','盐城'];
export function steamURL(input:string){try{const u=new URL(input);return u.protocol==='https:'&&u.hostname==='steamcommunity.com'&&/^\/(id\/[A-Za-z0-9_-]+|profiles\/\d{17})\/?$/.test(u.pathname)?u.href:null;}catch{return null;}}
export function webURL(input:string){try{const u=new URL(input);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
