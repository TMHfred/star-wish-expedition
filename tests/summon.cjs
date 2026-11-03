const A=require('node:assert/strict'),S=require('../dist/summon.js');let raw=null,fail=false;const store={getItem:()=>raw,setItem:(k,v)=>{if(fail)throw Error('quota');raw=v}};function seed(fields={}){raw=JSON.stringify({...S.empty(),diamonds:2000,...fields})}
A.equal(S.pool.length,13);for(const [r,n]of [['R',6],['SR',4],['SSR',3]])A.equal(S.pool.filter(h=>h.rarity===r).length,n);
seed();let s=S.draw(store,10,()=>.9);A.equal(s.diamonds,1000);A.equal(s.points,10);A.equal(s.last.length,10);A.equal(S.pool.find(h=>h.id===s.last[9].id).rarity,'SR');A.equal(s.last[0].isNew,true);A.equal(s.last[1].isNew,false);
seed({pity:49});s=S.draw(store,1,()=>.9);A.equal(s.pity,0);A.equal(S.pool.find(h=>h.id===s.last[0].id).rarity,'SSR');
seed({points:120,pity:30});s=S.exchange(store,'mila');A.equal(s.points,0);A.equal(s.pity,30);A.equal(s.owned.mila,1);
seed();const before=raw;fail=true;A.throws(()=>S.draw(store,10,()=>.9),/quota/);A.equal(raw,before);fail=false;
seed({diamonds:0});A.throws(()=>S.draw(store,1));A.throws(()=>S.exchange(store,'mila'));A.equal(S.load(store).diamonds,0);
seed({diamonds:0});s=S.rewards(store,Array.from({length:20},(_,i)=>i+1));A.equal(s.diamonds,1200);A.equal(S.rewards(store,Array.from({length:20},(_,i)=>i+1)).diamonds,1200);
seed();A.throws(()=>S.draw(store,1,()=>1));A.equal(S.load(store).diamonds,2000);
raw='{"version":2}';A.throws(()=>S.load(store));A.equal(raw,'{"version":2}');
console.log('summon pool, guarantee, pity, duplicates, exchange, atomic failure, rewards passed');
