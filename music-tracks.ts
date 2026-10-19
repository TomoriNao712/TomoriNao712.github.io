import type {Song} from './data';
export type Track={id:string;title:string;artist:string;category:string;src:string;source:string;sourceLabel:string;preview?:boolean};
export const radioTracks:Track[]=[
 {id:'wuwa-fantasies',title:'Dancing Through Fantasies',artist:'鸣潮 · jixwang / VISION SOUND',category:'鸣潮',src:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/d1/fc/75d1fcf8-9675-0a12-2a9b-588a8772d625/mzaf_12919276154649038368.plus.aac.p.m4a',source:'https://music.apple.com/us/album/dancing-through-fantasies/1790205952?i=1790205953',sourceLabel:'Apple Music · 官方试听',preview:true},
 {id:'touhou-necro',title:'Necro-Fantasia · ネクロファンタジア',artist:'ZUN / 上海アリス幻樂団',category:'东方 Project',src:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2c/11/04/2c11042f-5119-7fd9-0741-e03e23ed6e81/mzaf_11732698215127412727.plus.aac.p.m4a',source:'https://music.apple.com/us/album/necro-fantasia/1756211670?i=1756211678',sourceLabel:'Apple Music · 官方试听',preview:true},
 {id:'touhou-reincarnation',title:'Reincarnation · リーインカーネーション',artist:'ZUN / 上海アリス幻樂団',category:'东方 Project',src:'https://www16.big.or.jp/~zun/data/mp3/th3_05.mp3',source:'https://www16.big.or.jp/~zun/',sourceLabel:'ZUN 官网 · 公开音乐'},
 {id:'touhou-kaikidan',title:'東方怪奇談',artist:'ZUN / 上海アリス幻樂団',category:'东方 Project',src:'https://www16.big.or.jp/~zun/data/mp3/th1_04.mp3',source:'https://www16.big.or.jp/~zun/',sourceLabel:'ZUN 官网 · 公开音乐'},
];
export function songTrack(song:Song,index:number):Track|null{
 const direct=/\.(mp3|m4a|ogg|wav|aac)(\?.*)?$/i.test(song.url);
 if(!direct)return null;
 return{id:'collection-'+index,title:song.title,artist:song.artist,category:'我的收藏',src:song.url,source:song.url||'',sourceLabel:'收藏音源'};
}
export function shuffleNext(current:number,length:number,bag:number[],random=Math.random):{index:number;bag:number[]}{
 if(length<=1)return{index:0,bag:[]};
 if(!bag.length){bag=Array.from({length},(_,i)=>i).filter(i=>i!==current);for(let i=bag.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}}
 const [index,...rest]=bag;return{index,bag:rest};
}
