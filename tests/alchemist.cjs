const A=require('node:assert/strict'),B=require('../dist/battle-engine.js');
const positions=[{r:7,c:0},{r:7,c:1},{r:7,c:2},{r:3,c:3},{r:3,c:4},{r:0,c:6},{r:6,c:4},{r:5,c:3}];
function setup(){const b=B.create(positions,[{type:'sword',variant:'flame'},{type:'archer',variant:'alchemist'}]);b.autoUltimate=false;for(const u of b.units){u.cool=999;u.range=99;u.dmg=0;u.hp=u.max=2000}b.units[7].range=3;b.units[7].energy=100;return b}
function advance(b,n,events=[]){for(let i=0;i<n;i++){B.step(b,.025);events.push(...b.events.filter(e=>e.age===0).map(e=>({...e}))) }return events}
let b=setup(),u=b.units[7],v=b.units[3],untouched=b.units[4].hp;A(B.requestUltimate(b,7));A.equal(u.energy,0);A(!B.requestUltimate(b,7));let events=advance(b,70);A.equal(events.filter(e=>e.type==='gunfire').length,8);A.equal(events.filter(e=>e.type==='gunhit').length,8);A.equal(b.units[4].hp,untouched);A(v.poison);A(v.poison.remaining>3.5);A(!Array.isArray(v.poison));A.equal(b.units[0].energy,0);A.equal(b.units[6].energy,0);advance(b,180);A.equal(v.poison,null);const hp=v.hp;advance(b,80);A.equal(v.hp,hp);
b=setup();B.requestUltimate(b,7);advance(b,12);b.units[3].hp=0;events=advance(b,60);A(events.some(e=>e.type==='gunhit'&&e.to===4));A(!events.some(e=>e.type==='gunhit'&&e.to<3));
b=setup();B.requestUltimate(b,7);advance(b,12);u=b.units[7];u.hp=0;events=advance(b,60);A(!u.cast);A(!events.some(e=>e.type==='gunfire'));
b=setup();u=b.units[7];u.wind=.2;u.target=3;A(B.requestUltimate(b,7));A(u.queuedUltimate);advance(b,12);A(u.cast);A.equal(u.energy,0);A(!u.queuedUltimate);
console.log('PASS eight single-target shots, poison refresh/expiry without stacking, retarget, death cancellation and queued energy');
