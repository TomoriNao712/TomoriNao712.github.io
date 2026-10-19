'use client';
import {useEffect,useRef,useState} from 'react';
import {Sparkles,Pause,Play,Eye,EyeOff} from 'lucide-react';
type Character='yui'|'elaina';
export function CharacterPortrait({name,still=false,className=''}:{name:Character;still?:boolean;className?:string}){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const el=canvas.current!,ctx=el.getContext('2d')!;const image=new Image();let raf=0,visible=true,start=0,previous=-1,last=0;const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});observer.observe(el);
  function drawFrame(frame:number,alpha:number){ctx.globalAlpha=alpha;ctx.drawImage(image,frame%4*320,Math.floor(frame/4)*480,320,480,0,0,el.width,el.height);}
  function render(now:number){if(!still)raf=requestAnimationFrame(render);if(!visible||document.hidden||(!still&&now-last<33))return;last=now;if(!start)start=now;
   const elapsed=(now-start)%7800;const sequence=[0,1,2,3,4,5,6,7,0];const t=still||elapsed<3800?0:Math.min(8,(elapsed-3800)/210);const a=Math.floor(t),b=Math.min(8,a+1);const fraction=t-a;const blend=fraction*fraction*(3-2*fraction);
   const resolution=Math.min(2,devicePixelRatio||1),w=Math.round(el.clientWidth*resolution),h=Math.round(el.clientHeight*resolution);const resized=el.width!==w||el.height!==h;if(resized){el.width=w;el.height=h;}if(previous===t&&!resized)return;previous=t;ctx.clearRect(0,0,el.width,el.height);ctx.globalCompositeOperation='source-over';drawFrame(sequence[a],1-blend);if(blend){ctx.globalCompositeOperation='lighter';drawFrame(sequence[b],blend);}ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;el.dataset.frame=String(sequence[a]);
  }
  image.onload=()=>{if(still)render(performance.now());else raf=requestAnimationFrame(render);};image.src='/characters/'+name+'-sprites.webp';return()=>{cancelAnimationFrame(raf);observer.disconnect();image.onload=null;};
 },[name,still]);
 return <canvas ref={canvas} width="320" height="480" className={'character-portrait '+className} role="img" aria-label={name==='yui'?'平泽唯，轻轻拨动吉他、微笑眨眼的逐帧人物动画':'伊雷娜，抬手拢发与眨眼的逐帧人物动画'}/>;
}
export default function CharacterScene({mood,still,visible,onVisible,onPaused,paused}:{mood:string;still:boolean;visible:boolean;onVisible:()=>void;onPaused:()=>void;paused:boolean}){
 const [choice,setChoice]=useState('auto');const active:Character=choice==='auto'?(mood==='music'||mood==='games'?'yui':'elaina'):choice as Character;
 return <><div className={'character-background '+(visible?'':'hidden')} aria-hidden="true"><div className={'character-background-person yui '+(active==='yui'?'active':'')}><CharacterPortrait name="yui" still={still||paused||!visible||active!=='yui'}/></div><div className={'character-background-person elaina '+(active==='elaina'?'active':'')}><CharacterPortrait name="elaina" still={still||paused||!visible||active!=='elaina'}/></div><span className="character-background-caption">{active==='yui'?'放課後、もう一曲。':'旅の途中で、ひと休み。'}</span></div><div className="scene-controls"><button onClick={onVisible} aria-label={visible?'隐藏背景人物':'显示背景人物'} aria-pressed={visible}>{visible?<Eye size={13}/>:<EyeOff size={13}/>}<span>人物</span></button>{visible&&<><button onClick={onPaused} aria-label={paused?'继续人物动作':'暂停人物动作'} aria-pressed={!paused}>{paused?<Play size={12}/>:<Pause size={12}/>}</button><select aria-label="背景人物选择" value={choice} onChange={e=>setChoice(e.target.value)}><option value="auto">随分区</option><option value="yui">呆唯</option><option value="elaina">伊雷娜</option></select></>}</div></>;
}
export function HeroCompanions({still,visible}:{still:boolean;visible:boolean}){return <div className={'hero-companions '+(visible?'':'hidden')}><div className="hero-character yui"><CharacterPortrait name="yui" still={still||!visible}/></div><div className="hero-character elaina"><CharacterPortrait name="elaina" still={still||!visible}/></div><span className="hero-character-note">放課後の音楽と、魔女の旅。</span></div>;}
