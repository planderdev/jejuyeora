import fs from 'node:fs';
import assert from 'node:assert/strict';
import {renderComponent,strings} from '../dist/components.js';
const catalog=JSON.parse(fs.readFileSync(new URL('../dist/catalog.json',import.meta.url)));
assert.equal(catalog.length,83);
assert.equal(new Set(catalog.map(i=>i.id)).size,83,'Route ids must be unique');
assert.deepEqual(['foundation','component','utility'].map(c=>catalog.filter(i=>i.category===c).length),[6,73,4]);
let renders=0;
for(const item of catalog){
 assert.ok(item.source.startsWith('https://tossmini-docs.toss.im/tds-mobile/') || item.source.startsWith('https://designsystem.line.me/LDSG/')); 
 if(item.category==='foundation')continue;
 for(const lang of ['ko','en','zh']){
  const html=renderComponent(item.id,{lang});
  assert.ok(html.includes(`data-component="${item.id}"`));
  assert.ok(html.length>150);
  assert.ok(!/undefined|NaN/.test(html));
  renders++;
 }
}
const keys=Object.keys(strings.ko).sort();
for(const locale of ['en','zh'])assert.deepEqual(Object.keys(strings[locale]).sort(),keys);
const tokens=JSON.parse(fs.readFileSync(new URL('../dist/tokens.json',import.meta.url)));
assert.equal(tokens.typography.length,20);
for(const [k,v] of Object.entries(tokens.palettes))assert.equal(v.length,10,k);
for(const t of tokens.typography)assert.equal(t.ios.length,9,t.name);
const css=fs.readFileSync(new URL('../dist/tokens.css',import.meta.url),'utf8');
for(const file of css.matchAll(/url\(['"]?([^)'";]+)['"]?\)/g))if(!file[1].startsWith('data:'))assert.ok(fs.existsSync(new URL('../dist/'+file[1],import.meta.url)),file[1]);
assert.ok(css.includes('--jy-primary:#634bff'));
assert.ok(css.includes('--jy-bg:#161525'));
assert.equal(catalog.filter(i=>i.origin==='tds').length,63);
assert.equal(catalog.filter(i=>i.origin==='line').length,20);
const audit=JSON.parse(fs.readFileSync(new URL('../dist/reference-audit.json',import.meta.url)));
assert.equal(audit.items.length,41);
for(const item of audit.items)if(item.target)assert.ok(catalog.some(c=>c.id===item.target));
console.log(`PASS: 83 unique routes; 63 TDS routes retained; 41 LINE references reviewed; ${renders} locale renders; complete locale keys; 9 palettes; 20 typography tokens; local font assets.`);
