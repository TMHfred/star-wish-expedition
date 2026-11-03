import * as THREE from './assets/three.module.js';
import createVFX from './assets/fireball.mjs';
const mode=document.querySelector('#vfx-mode'),note=document.querySelector('#vfx-note');
try {
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(800,580,false);renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;renderer.domElement.className='vfx-layer';renderer.domElement.setAttribute('aria-label','00GameDevs 火球特效層');document.querySelector('.arena').append(renderer.domElement);
 const camera=new THREE.OrthographicCamera(0,800,580,0,-1000,1000);camera.position.z=100;
 const scene=new THREE.Scene();let effect=null,selected=false,contact=false;
 function reset(){effect?.dispose();effect=null;contact=false;renderer.clear()}
 window.fireVFX={active:()=>selected,start(){reset();selected=mode.value==='asset';if(selected){effect=createVFX({size:1,density:.5,detail:1,speed:1});effect.group.scale.setScalar(25);effect.group.position.set(278,268,0);scene.add(effect.group)}},reset,hit(){if(effect&&!contact){contact=true;effect.hit(new THREE.Vector3(505,286,0))}},update(dt,t){if(effect){if(t!==undefined&&!contact){const p=Math.max(0,Math.min(1,(t-.55)/.55));effect.group.position.set(278+227*p,268+18*p,0);effect.group.visible=t>=.55}effect.update(dt);if(effect.finished){effect.dispose();effect=null}}renderer.render(scene,camera)}};
 mode.querySelector('[value="asset"]').disabled=false;mode.querySelector('[value="asset"]').textContent='00GameDevs 熾焰火球';mode.value='asset';
 mode.onchange=()=>{reset();selected=mode.value==='asset';note.textContent=selected?'目前：00GameDevs 原始特效 · 共用相同受擊回饋':'目前：Canvas 自製火球 · 共用相同受擊回饋'};
 note.textContent='00GameDevs 熾焰火球已就緒。切換版本後點擊「熾火彈」比較。';
} catch(error){note.textContent='此裝置無法啟用 WebGL2，仍可使用原版自製火球。';mode.value='original';mode.querySelector('[value="asset"]').textContent='00GameDevs（WebGL不可用）';console.error(error)}
