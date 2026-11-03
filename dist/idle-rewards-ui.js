window.IdleRewards={async show(body){
 const lock=fn=>navigator.locks?navigator.locks.request(Starboard.key,fn):Promise.reject(Error('此瀏覽器無法安全領取，請使用新版瀏覽器'));
 body.innerHTML='<p>每小時累積 5 星輝碎片，離線也可累積；最多保存 12 小時（60 碎片）。</p><p id="idle-status"></p><p id="idle-balance"></p><button class="primary" id="idle-claim" disabled>領取碎片</button><p id="idle-notice" role="status"></p><a href="starboard.html">前往星盤培養</a>';
 const status=body.querySelector('#idle-status'),balance=body.querySelector('#idle-balance'),button=body.querySelector('#idle-claim'),notice=body.querySelector('#idle-notice');let busy=false;
 function render(){if(!status.isConnected)return;try{const state=Starboard.load(localStorage),info=Starboard.idleStatus(state);status.textContent=info.unlocked?`可領取 ${info.amount} 碎片 / 60${info.capped?'（已達上限）':` · 下一批約 ${Math.ceil(info.nextIn/60000)} 分鐘`}`:'首次通過 1-1 後開啟放置收益。';balance.textContent=`持有星輝碎片：${state.shards}`;button.disabled=busy||!info.amount}catch(e){button.disabled=true;notice.textContent=e.message}}
 button.onclick=async()=>{busy=true;render();try{const result=await lock(()=>Starboard.claimIdle(localStorage));notice.textContent=result.amount?`已領取 ${result.amount} 星輝碎片。`:'目前沒有可領取的碎片。'}catch(e){notice.textContent='未完成領取，請重試：'+e.message}finally{busy=false;render()}};
 try{await lock(()=>Starboard.ensureIdle(localStorage))}catch(e){notice.textContent=e.message}render();
 const timer=setInterval(()=>{if(!status.isConnected||!body.closest('dialog').open){clearInterval(timer);return}render()},1000);
}};
