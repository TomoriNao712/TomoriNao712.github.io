'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Play,Pause,SkipForward,Shuffle,Volume2,VolumeX,X,ExternalLink,Music2,ChevronDown,Loader2} from 'lucide-react';
import {radioTracks,shuffleNext,songTrack,type Track} from './music-tracks';
import type {Song} from './data';
const clock=(n:number)=>Number.isFinite(n)?Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0'):'0:00';
export default function MusicPlayer({songs}:{songs:Song[]}){
 const tracks=useMemo(()=>[...radioTracks,...songs.map(songTrack).filter((t):t is Track=>t!==null)],[songs]);
 const [index,setIndex]=useState(0),[playing,setPlaying]=useState(false),[loading,setLoading]=useState(false),[random,setRandom]=useState(true),[volume,setVolume]=useState(.35),[time,setTime]=useState(0),[duration,setDuration]=useState(0),[started,setStarted]=useState(false),[error,setError]=useState(''),[expanded,setExpanded]=useState(false),[category,setCategory]=useState('全部');
 const audio=useRef<HTMLAudioElement>(null),want=useRef(false),bag=useRef<number[]>([]);const track=tracks[index]||tracks[0];
 useEffect(()=>{const n=Number(localStorage.getItem('nao-radio-volume'));if(localStorage.getItem('nao-radio-volume')!==null&&Number.isFinite(n)&&n>=0&&n<=1)setVolume(n);},[]);
 useEffect(()=>{if(audio.current)audio.current.volume=volume;localStorage.setItem('nao-radio-volume',String(volume));},[volume]);
 useEffect(()=>{setTime(0);setDuration(0);setError('');setPlaying(false);if(want.current){setLoading(true);audio.current?.play().catch(()=>{setLoading(false);setError('点击播放即可继续；也可以切换下一首。');want.current=false;});}},[track.id]);
 useEffect(()=>{bag.current=[];},[tracks.length]);
 useEffect(()=>{if(index>=tracks.length){want.current=false;setIndex(0);}},[tracks.length,index]);
 // Media actions stay on this one audio element, so scrolling never interrupts a song.
 function play(){if(!audio.current)return;setStarted(true);setError('');want.current=true;setLoading(true);audio.current.play().catch(()=>{setLoading(false);want.current=false;setError('音源暂时无法播放，可以重试、切换下一首或打开原平台。');});}
 function pause(){want.current=false;audio.current?.pause();setLoading(false);}
 function choose(i:number){setExpanded(false);if(i===index)play();else{want.current=true;setStarted(true);setIndex(i);}}
 function next(){let i;if(random){const n=shuffleNext(index,tracks.length,bag.current);i=n.index;bag.current=n.bag;}else i=(index+1)%tracks.length;choose(i);}
 function toggle(){if(playing||loading)pause();else play();}
 const controls=<><button className="radio-play" aria-label={playing||loading?'暂停音乐':'播放音乐'} onClick={toggle}>{loading?<Loader2 size={18} className="spinner"/>:playing?<Pause size={18}/>:<Play size={18}/>}</button><button className="icon-button" aria-label="下一首音乐" onClick={next}><SkipForward size={17}/></button></>;
 return <div className="radio-room" data-playing={playing}>
 <audio ref={audio} data-testid="nao-audio" src={track.src} preload="none" onPlaying={()=>{setPlaying(true);setLoading(false);}} onPause={()=>setPlaying(false)} onWaiting={()=>setLoading(true)} onCanPlay={()=>setLoading(false)} onTimeUpdate={e=>setTime(e.currentTarget.currentTime)} onLoadedMetadata={e=>setDuration(e.currentTarget.duration)} onEnded={next} onError={()=>{setLoading(false);setPlaying(false);want.current=false;setError('这个音源暂时无法加载。可以切换下一首，或打开原平台收听。');}}/>
 <div className="radio-label"><span><span className="radio-status-dot"/> NAO'S LITTLE RADIO</span><button className={'radio-mode '+(random?'enabled':'')} aria-label="随机播放模式" aria-pressed={random} onClick={()=>{setRandom(!random);bag.current=[];}}><Shuffle size={12}/>{random?'随机播放':'顺序播放'}</button></div>
 <div className="radio-now"><div className="radio-disc" aria-hidden="true"><Music2 size={20}/></div><div className="radio-track"><span>{track.category}{track.preview?' / 试听片段':' / 完整音轨'}</span><h4>{track.title}</h4><small>{track.artist}</small></div><div className="radio-controls">{controls}</div></div>
 <div className="radio-seek"><span>{clock(time)}</span><input aria-label="音乐播放进度" type="range" min="0" max={duration||1} step=".1" value={Math.min(time,duration||1)} disabled={!duration} onChange={e=>{if(audio.current)audio.current.currentTime=Number(e.target.value);setTime(Number(e.target.value));}}/><span>{clock(duration)}</span></div>
 <div className="radio-bottom"><a href={track.source||'#music'} target={track.source?'_blank':undefined} rel="noreferrer">{track.sourceLabel}{track.source&&<ExternalLink size={10}/>}</a><div className="radio-volume"><button aria-label={volume===0?'取消音乐静音':'音乐静音'} onClick={()=>setVolume(volume===0?.35:0)}>{volume===0?<VolumeX size={13}/>:<Volume2 size={13}/>}</button><input aria-label="音乐音量" type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(Number(e.target.value))}/></div><button className="radio-library" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>歌单 {tracks.length}<ChevronDown size={12}/></button></div>
 {error&&<p className="radio-error" role="status">{error}</p>}
 {expanded&&<div className="radio-queue"><div className="radio-filters">{['全部','鸣潮','东方 Project','我的收藏'].map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>{tracks.filter(t=>category==='全部'||category===t.category).length?tracks.map((t,i)=>(category==='全部'||category===t.category)&&<button className={'radio-queue-track '+(index===i?'selected':'')} key={t.id} onClick={()=>choose(i)}><span>{String(i+1).padStart(2,'0')}</span><div><b>{t.title}</b><small>{t.artist}</small></div><span>{t.preview?'试听':'完整'}</span>{index===i&&playing?<span className="equalizer"><i/><i/><i/></span>:<Play size={12}/>}</button>):<p className="radio-empty">上传自己的音乐后，就会出现在这里。</p>}</div>}
 <p className="radio-hint">点击播放，让旋律陪你逛逛。商业曲目为平台试听，可打开原平台收听完整版本；上传的音乐也会加入随机歌单。</p>
 {started&&<div className="radio-dock"><div className="dock-note" aria-hidden="true">♫</div><div className="dock-track"><b>{track.title}</b><span>{loading?'正在载入…':playing?(track.preview?'正在试听':'正在播放'):'已暂停'} · {random?'随机播放':'顺序播放'}</span></div><button className="icon-button" aria-label={playing||loading?'暂停背景音乐':'继续背景音乐'} onClick={toggle}>{playing||loading?<Pause size={15}/>:<Play size={15}/>}</button><button className="icon-button" aria-label="切换背景音乐" onClick={next}><SkipForward size={15}/></button><button className="icon-button" aria-label="关闭背景播放器" onClick={()=>{pause();setStarted(false);}}><X size={13}/></button></div>}
 </div>;
}
