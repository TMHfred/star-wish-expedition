const A=require('node:assert/strict'),S=require('../dist/starboard.js');
const map=new Map,storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
A.throws(()=>S.claimVictory(storage,1,'我方落敗'));A.throws(()=>S.claimVictory(storage,1,'時間到・平手'));A.throws(()=>S.claimVictory(storage,2,'我方勝利'));A.equal(map.size,0);
const legacy={version:1,revision:2,shards:20,unlocked:[]};storage.setItem(S.key,JSON.stringify(legacy));A.equal(S.claimVictory(storage,1,'我方勝利').amount,30);A.equal(S.load(storage).shards,50);A.equal(S.claimVictory(storage,1,'我方勝利').amount,0);
let state=S.load(storage);state=S.purchase(storage,state,[S.nodes[0].id]);A.equal(state.shards,40);A.deepEqual(state.firstClears,[1]);A.equal(S.claimVictory(storage,1,'我方勝利').amount,0);
let total=30;for(let stage=2;stage<=20;stage++)total+=S.claimVictory(storage,stage,'我方勝利').amount;A.equal(total,1370);A.equal(S.load(storage).shards,1380);A.equal(S.load(storage).firstClears.length,20);A.throws(()=>S.claimVictory(storage,21,'我方勝利'));
const denied={getItem:()=>null,setItem(){throw Error('quota')}};A.throws(()=>S.claimVictory(denied,1,'我方勝利'));A.throws(()=>S.load({getItem:()=>'{broken'}));
console.log('PASS first-clear only, 1370 chapter total, legacy saves, training preserves claims and write failures');
