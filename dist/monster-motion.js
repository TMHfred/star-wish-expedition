(function(root){
// Ordinary attacks release at .38 seconds in BattleRules. Feet remain the pivot.
function pose(kind,age,moving,move){const p={x:0,y:0,sx:1,sy:1,rotation:0,flash:0};if(moving){p.y=-Math.abs(Math.sin(move*(kind===0?20:15)))*(kind===0?7:3);p.rotation=Math.sin(move*16)*.025;return p}if(age<0||age>=.9)return p;
const wind=Math.min(1,age/.38),release=age>=.38?Math.max(0,1-(age-.38)/.38):0;
if(kind===0){if(age<.26){const f=Math.sin(age/.26*Math.PI/2);p.sx=1+.22*f;p.sy=1-.23*f;p.x=-5*f}else if(age<.38){const f=(age-.26)/.12;p.sx=1.22-.37*f;p.sy=.77+.43*f;p.x=-5+13*f;p.y=-5*f}else{p.sx=1-.12*release;p.sy=1+.15*release;p.x=9*release;p.flash=release}}
else if(kind===1){if(age<.3){p.rotation=-.3*Math.sin(wind*Math.PI/2);p.x=-9*wind}else{const f=Math.min(1,(age-.3)/.08),r=age<.38?f:release;p.x=18*r;p.rotation=.45*r;p.y=-3*r}}
else{if(age<.38){p.sx=1+.06*Math.sin(wind*Math.PI/2);p.sy=1+.05*wind;p.rotation=-.09*wind;p.x=-6*wind}else{p.x=10*release;p.rotation=.10*release;p.sx=1-.06*release;p.flash=release}}
return p}
const api={pose};if(typeof module!=='undefined')module.exports=api;else root.MonsterMotion=api;
})(globalThis);
