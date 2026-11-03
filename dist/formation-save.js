(function(root){
const H=typeof module!=='undefined'?require('./hero-data.js'):root.HeroData;
const key='starwish.formation.v1',backup=key+'.backup';
function encode(ids,positions){return {version:1,party:ids.map(id=>H.byBattleId[id].id),positions:Object.fromEntries(H.heroes.map(h=>[h.id,{r:positions[h.battleId].r,c:positions[h.battleId].c}]))}}
function decode(data,defaults){
  if(!data||data.version!==1||!Array.isArray(data.party)||data.party.length<1||data.party.length>5||new Set(data.party).size!==data.party.length)throw Error('Invalid save');
  const byId=Object.fromEntries(H.heroes.map(h=>[h.id,h]));
  const ids=data.party.map(id=>{if(!Object.hasOwn(byId,id))throw Error('Unknown hero');return byId[id].battleId});
  const positions=defaults.map(p=>({...p})),occupied=new Set;
  for(const hero of H.heroes){const p=data.positions?.[hero.id]||(hero.battleId>=12?defaults[hero.battleId]:null);if(!p||!Number.isInteger(p.r)||!Number.isInteger(p.c)||p.r<4||p.r>7||p.c<0||p.c>6)throw Error('Invalid position');positions[hero.battleId]={r:p.r,c:p.c};if(ids.includes(hero.battleId)){const cell=p.r+','+p.c;if(occupied.has(cell))throw Error('Overlapping party');occupied.add(cell)}}
  return {ids,positions};
}
function load(storage,defaults){
  for(const slot of [key,backup]){try{const raw=storage.getItem(slot);if(!raw)continue;const data=JSON.parse(raw);if(Number.isInteger(data?.version)&&data.version>1)return {blocked:true};return decode(data,defaults)}catch{}}
  return null;
}
function save(storage,ids,positions,defaults){try{const data=encode(ids,positions);decode(data,defaults);const old=storage.getItem(key);if(old){let valid=false;try{const parsed=JSON.parse(old);if(Number.isInteger(parsed?.version)&&parsed.version>1)return false;decode(parsed,defaults);valid=true}catch{}if(valid)storage.setItem(backup,old)}storage.setItem(key,JSON.stringify(data));return true}catch{return false}}
const api={key,backup,encode,decode,load,save};if(typeof module!=='undefined')module.exports=api;else root.FormationSave=api;
})(globalThis);
