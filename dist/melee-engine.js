(function(root){
const key=p=>p.r+','+p.c,valid=p=>p&&Number.isInteger(p.r)&&Number.isInteger(p.c)&&p.r>=0&&p.r<8&&p.c>=0&&p.c<7;
function distance(a,b){const aq=a.c-(a.r-(a.r&1))/2,bq=b.c-(b.r-(b.r&1))/2,dq=aq-bq,dr=a.r-b.r;return (Math.abs(dq)+Math.abs(dr)+Math.abs(dq+dr))/2}
function neighbors(p){const out=[];for(let r=Math.max(0,p.r-1);r<=Math.min(7,p.r+1);r++)for(let c=Math.max(0,p.c-1);c<=Math.min(6,p.c+1);c++){const v={r,c};if(distance(p,v)===1)out.push(v)}return out}
function route(start,target,occupied=[]){if(!valid(start)||!valid(target)||key(start)===key(target))return null;const blocked=new Set(occupied.map(key));blocked.add(key(target));if(blocked.has(key(start)))return null;const queue=[[start]],seen=new Set([key(start)]);for(let i=0;i<queue.length;i++){const path=queue[i],p=path[path.length-1];if(distance(p,target)===1)return path;for(const n of neighbors(p).sort((a,b)=>distance(a,target)-distance(b,target))){const k=key(n);if(!seen.has(k)&&!blocked.has(k)){seen.add(k);queue.push([...path,n])}}}return null}
const api={key,valid,distance,neighbors,route};if(typeof module!=='undefined')module.exports=api;else root.MeleeRules=api;
})(globalThis);
