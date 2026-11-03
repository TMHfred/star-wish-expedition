(function(root){
const heroes=[
  {id:'sword',battleId:1,name:'劍士',role:'劍士',portrait:'assets/sword-standard.png',sprite:'assets/swordsman/atlas.png',battle:{type:'sword',variant:null},skills:{basic:'斬擊',ultimate:'三段半月斬'}},
  {id:'mage',battleId:2,name:'法師',role:'法師',portrait:'assets/mage-standard.png',sprite:'assets/hero-only/atlas.png',battle:{type:'mage',variant:null},skills:{basic:'單體火球',ultimate:'範圍火焰'}},
  {id:'archer',battleId:0,name:'弓箭手',role:'弓箭手',portrait:'assets/archer-standard.png',sprite:'assets/archer-sheet.png',battle:{type:'archer',variant:null},skills:{basic:'單體箭',ultimate:'三波範圍箭雨'}},
  {id:'garnet',battleId:6,name:'紅蓮女戰士 嘉妮特',role:'劍士',portrait:'assets/knight-standard.png',sprite:'assets/knight-sheet.png',battle:{type:'sword',variant:'flame'},skills:{basic:'劍士普攻',ultimate:'三連火焰半月斬'}},
  {id:'katia',battleId:7,name:'天才萬能科學家 卡蒂亞',role:'弓箭手',portrait:'assets/alchemist-standard.png',sprite:'assets/alchemist-sheet.png',battle:{type:'archer',variant:'alchemist'},skills:{basic:'弓手普攻',ultimate:'毒彈機關槍'}},
  {id:'mila',battleId:8,name:'純白修女 米菈',role:'法師',portrait:'assets/saint-standard.png',sprite:'assets/saint-sheet.png',battle:{type:'mage',variant:'saint'},skills:{basic:'法師普攻',ultimate:'範圍治療'}}
];
const C=typeof module!=='undefined'?require('./character-data.js'):root.CharacterData;heroes.push(...C.heroes);
for(const h of heroes)if(['garnet','katia','mila'].includes(h.id))h.rarity='SSR';
const byBattleId=Object.fromEntries(heroes.map(hero=>[hero.battleId,hero]));
const api=Object.freeze({heroes:Object.freeze(heroes.map(Object.freeze)),byBattleId:Object.freeze(byBattleId)});
if(typeof module!=='undefined')module.exports=api;else root.HeroData=api;
})(globalThis);
