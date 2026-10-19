// Store-only ZIP, with UTF-8 names. Runs locally; no remote service or token.
const encoder=new TextEncoder();
const table=Uint32Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
function crc(bytes){let c=0xffffffff;for(const b of bytes)c=table[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0;}
export async function makeZip(files){
 const parts=[],entries=[];let offset=0;
 for(const {name,data}of files){const bytes=typeof data==='string'?encoder.encode(data):new Uint8Array(await data.arrayBuffer()),filename=encoder.encode(name),sum=crc(bytes),header=new Uint8Array(30+filename.length),v=new DataView(header.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,sum,true);v.setUint32(18,bytes.length,true);v.setUint32(22,bytes.length,true);v.setUint16(26,filename.length,true);header.set(filename,30);parts.push(header,bytes);entries.push({filename,sum,size:bytes.length,offset});offset+=header.length+bytes.length;}
 const centralStart=offset;
 for(const e of entries){const header=new Uint8Array(46+e.filename.length),v=new DataView(header.buffer);v.setUint32(0,0x02014b50,true);v.setUint16(4,20,true);v.setUint16(6,20,true);v.setUint16(8,0x800,true);v.setUint32(16,e.sum,true);v.setUint32(20,e.size,true);v.setUint32(24,e.size,true);v.setUint16(28,e.filename.length,true);v.setUint32(42,e.offset,true);header.set(e.filename,46);parts.push(header);offset+=header.length;}
 const end=new Uint8Array(22),v=new DataView(end.buffer);v.setUint32(0,0x06054b50,true);v.setUint16(8,entries.length,true);v.setUint16(10,entries.length,true);v.setUint32(12,offset-centralStart,true);v.setUint32(16,centralStart,true);parts.push(end);return new Blob(parts,{type:'application/zip'});
}
