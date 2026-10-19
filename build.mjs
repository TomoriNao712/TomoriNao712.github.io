import fs from 'node:fs/promises';
import {build} from 'vite';
await fs.mkdir('public/content',{recursive:true});
let content='content/notebook.json';
try{await fs.access('../content/notebook.json');content='../content/notebook.json';}catch{}
await fs.copyFile(content,'public/content/notebook.json');
await build();
