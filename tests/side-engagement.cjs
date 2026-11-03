const A=require('node:assert/strict'),B=require('../dist/battle-engine.js'),R=require('../dist/melee-engine.js');
const positions=[{r:7,c:3},{r:5,c:2},{r:6,c:1},{r:1,c:4},{r:2,c:3},{r:0,c:5}];
for(const auto of [false,true]){const b=B.create(positions);b.sideEngagement=true;b.autoUltimate=auto;for(let n=0;n<3600&&!b.result;n++){B.step(b,.025);const occupied=new Set;for(const u of b.units.filter(u=>u.hp>0)){for(const p of [u.pos,u.to].filter(Boolean)){A(R.valid(p));const k=R.key(p);A(!occupied.has(k),'units may not occupy or reserve same cell');occupied.add(k)}}}A(b.result);}
console.log('PASS side engagement terminates without occupied/reserved cell collisions');
