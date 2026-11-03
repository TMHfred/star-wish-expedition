(function(root){
const U=typeof module!=='undefined'?require('./summon.js'):root.Summon;
function status(storage){return U.onboarding(U.load(storage))}
function owned(storage){return Object.keys(U.load(storage).owned)}
function migrate(storage){const s=U.load(storage);if(s.legacyMigrated)return s;const growthRaw=storage.getItem('starwish.growth.v1'),formationRaw=storage.getItem('starwish.formation.v1');let ids=[];if(formationRaw){const f=JSON.parse(formationRaw);if(f.version!==1)throw Error('編隊存檔版本不支援');ids=(f.party||[]).filter(id=>['garnet','katia','mila'].includes(id))}if(growthRaw){const g=JSON.parse(growthRaw);if(g.version!==1)throw Error('養成存檔版本不支援');if((g.unlocked||[]).length&&!ids.includes('garnet'))ids.push('garnet')}for(const id of ids)s.owned[id]=Math.max(1,s.owned[id]||0);s.legacyMigrated=true;U.validate(s);storage.setItem(U.key,JSON.stringify(s));return s}
const api={status,owned,migrate};if(typeof module!=='undefined')module.exports=api;else root.Onboarding=api;
})(globalThis);
