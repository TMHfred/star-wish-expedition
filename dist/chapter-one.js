(function(root){
const M=typeof module!=='undefined'?require('./monster-data.js'):root.MonsterData,B=typeof module!=='undefined'?require('./battle-engine.js'):root.BattleRules,E=typeof module!=='undefined'?require('./test-encounter.js'):root.TestEncounter;
const layouts=[[[3,2],[3,4],[1,3],[2,1],[2,5],[0,3]],[[3,1],[3,5],[2,3],[1,1],[1,5],[0,3]],[[3,2],[2,3],[3,4],[1,2],[1,4],[0,3]],[[3,0],[3,6],[2,2],[2,4],[1,1],[1,5]]];
const rows=[
 ['林間水光',['slime','slime']],['哥布林哨站',['goblin','goblin']],['溪畔伏兵',['goblin','slime','slime']],['狼影初現',['wolf','goblin','slime']],['岔路追逐',['wolf','wolf','slime','goblin']],
 ['紫傘林地',['goblin','mushroom','mushroom']],['狼群包抄',['wolf','wolf','goblin','slime']],['古木甦醒',['treant','goblin','mushroom']],['林地守望',['treant','wolf','slime','mushroom']],['星鱗前哨',['goblin','treant','dragon','slime','wolf']],
 ['孢子小徑',['wolf','goblin','mushroom','mushroom','slime']],['樹根防線',['treant','treant','goblin','mushroom']],['雙翼掠影',['wolf','goblin','dragon','dragon','slime']],['密林圍獵',['wolf','wolf','treant','mushroom','goblin']],['古樹關隘',['treant','goblin','dragon','mushroom','slime']],
 ['六方伏擊',['wolf','goblin','treant','slime','mushroom','dragon']],['孢子迷霧',['treant','wolf','mushroom','mushroom','slime','dragon']],['群狼奔襲',['wolf','wolf','wolf','treant','mushroom','goblin']],['森林聯陣',['treant','goblin','wolf','dragon','mushroom','slime']],['星鱗之巢',['treant','wolf','dragon','mushroom','slime']]
];
const stages=rows.map(([name,monsters],i)=>({id:i+1,name,monsters,hpScale:.65+i*.065,attackScale:.35+i*.018,layout:i%layouts.length}));
function unlocked(stage,clears){return Number.isInteger(stage)&&stage>=1&&stage<=20&&(stage===1||clears.includes(stage)||clears.includes(stage-1))}
function create(stageId,positions,selected){const stage=stages[stageId-1];if(!stage||!Number.isInteger(stageId))throw Error('Invalid stage');const b=E.create(positions,selected),slots=[3,4,5,9,10,11];slots.forEach((id,index)=>{const u=b.units[id],monsterId=stage.monsters[index];u.deployed=!!monsterId;if(!monsterId){u.hp=u.max=0;return}const monster=M.byId[monsterId],base=B.stats[monster.type],elite=stageId===20&&monsterId==='dragon';Object.assign(u,base,{type:monster.type,enemyArt:M.monsters.indexOf(monster),monsterId,boss:elite,pos:{r:layouts[stage.layout][index][0],c:layouts[stage.layout][index][1]},hp:Math.round(base.hp*stage.hpScale*(elite?1.6:1)),dmg:Math.round(base.dmg*stage.attackScale*(elite?1.15:1))});u.max=u.hp});b.stageId=stageId;return b}
const api={stages,unlocked,create};if(typeof module!=='undefined')module.exports=api;else root.ChapterOne=api;
})(globalThis);
