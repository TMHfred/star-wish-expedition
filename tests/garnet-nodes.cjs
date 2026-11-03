const A=require('node:assert/strict'),B=require('../dist/battle-engine.js');
function setup(nodes){const b=B.create([{r:7,c:0},{r:7,c:1},{r:7,c:2},{r:4,c:4},{r:3,c:3},{r:0,c:6},{r:4,c:3}],[{type:'sword',variant:'flame'}]);b.autoUltimate=false;for(const u of b.units){u.cool=999;u.hp=u.max=2000;u.armor=0}const u=b.units[6];B.applyGarnetNodes(u,nodes);u.energy=100;B.requestUltimate(b,6);return b}
let b=setup(['power','vitality','mastery','finale','resolve']),u=b.units[6];A.equal(u.dmg,57.75);A.equal(u.max,2200);for(let i=0;i<40;i++)B.step(b,.025);A.equal(b.units[3].hp,1802);A.equal(u.guardUntil,b.time+4);A.throws(()=>B.applyGarnetNodes(u,[]));
function hit(b){const u=b.units[6];const before=u.hp;b.projectiles.push({from:3,to:6,damage:100,age:0,duration:0});B.step(b,.025);return before-u.hp}
A.equal(hit(b),85);B.step(b,4);A.equal(hit(b),100);
b=setup(['resolve']);b.units[4].pos={r:0,c:0};for(let i=0;i<40;i++)B.step(b,.025);A.equal(b.units[6].guardUntil,undefined);
b=setup(['resolve']);B.step(b,.3);b.units[6].hp=0;B.step(b,.8);A.equal(b.units[6].guardUntil,0);
console.log('PASS Garnet stat bonuses, additive ultimate bonuses, distinct targets, delayed guard, expiry and death');
