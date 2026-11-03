(function(root){
// Stable IDs for future encounter definitions. Types reuse existing combat rules;
// names such as mushroom do not implicitly add poison or other new mechanics.
const monsters=[
 {id:'slime',name:'水滴精靈',image:'assets/forest-slime.webp',type:'archer',motion:0,size:'small'},
 {id:'goblin',name:'林地哥布林',image:'assets/forest-goblin.webp',type:'sword',motion:1,size:'humanoid'},
 {id:'dragon',name:'星鱗幼龍',image:'assets/forest-dragon.webp',type:'mage',motion:2,size:'medium'},
 {id:'wolf',name:'森林狼',image:'assets/forest-wolf.webp',type:'sword',motion:1,size:'humanoid'},
 {id:'mushroom',name:'毒傘菇',image:'assets/forest-mushroom.webp',type:'mage',motion:0,size:'small'},
 {id:'treant',name:'荊棘樹靈',image:'assets/forest-treant.webp',type:'sword',motion:1,size:'medium'}
].map(Object.freeze);
const api=Object.freeze({monsters:Object.freeze(monsters),byId:Object.freeze(Object.fromEntries(monsters.map(m=>[m.id,m])))});
if(typeof module!=='undefined')module.exports=api;else root.MonsterData=api;
})(globalThis);
