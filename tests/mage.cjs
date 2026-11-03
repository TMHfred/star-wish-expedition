const A=require('node:assert/strict'),B=require('../dist/battle-engine.js');const pos=[{r:5,c:6},{r:6,c:6},{r:4,c:3},{r:2,c:3},{r:2,c:4},{r:0,c:0}];
function setup(){let b=B.create(pos);b.autoUltimate=false;Object.assign(b.units[3],B.stats.tank,{type:"tank",max:540});for(const u of b.units)if(u.id!==2)u.wind=99;else u.cool=0;return b}function run(b,n){for(let i=0;i<n;i++)B.step(b,.025)}
let b=setup();run(b,17);A.equal(b.projectiles.length,1);A.equal(b.units[3].hp,540);A.equal(b.units[2].energy,25);run(b,24);A.equal(b.units[3].hp,490);A.equal(b.units[4].hp,330);
b=setup();run(b,17);b.units[3].hp=0;run(b,24);A.equal(b.units[4].hp,330,'dead target projectile must not retarget');
b=setup();b.units[2].energy=100;A(B.ultimate(b,2));A.equal(b.units[2].energy,0);A(!B.ultimate(b,2));A.deepEqual(b.units[2].cast.center,pos[3]);run(b,41);A.equal(b.units[3].hp,452);A.equal(b.units[4].hp,215);A.equal(b.units[5].hp,230);
b=setup();b.units[2].energy=100;A(B.ultimate(b,2));b.units[3].pos={r:0,c:6};run(b,41);A.equal(b.units[3].hp,540,'escaping locked area avoids blast');A.equal(b.units[4].hp,215);console.log('PASS fireball flight/single target/dead target, energy cost, locked hex AoE, escape');
