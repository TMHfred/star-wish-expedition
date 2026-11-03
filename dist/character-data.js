(function(root){
const rows=[
['allen','見習劍士 艾倫','R','sword',260,36,.85,.05,1.1,'基礎斬擊','勇氣橫斬','前方扇形180%傷害'],
['bruno','鐵壁守衛 布魯諾','R','sword',320,25,.70,.08,1.1,'守衛斬擊','盾壁衝擊','扇形140%傷害與擊退，自身減傷10%三秒'],
['liv','森林獵手 莉芙','R','archer',185,33,.85,.02,4,'獵手箭','定點三連矢','單體三箭，每箭80%傷害'],
['finn','活力射手 菲恩','R','archer',175,24,1.15,.02,3.5,'輕快射擊','疾射節拍','自身攻速增加25%，持續五秒'],
['luna','星光學徒 露娜','R','mage',170,38,.65,.02,3.5,'星光彈','小小星雨','半徑一格160%傷害'],
['flora','草藥少女 芙蘿拉','R','mage',190,30,.65,.03,3.5,'芽光彈','草葉療癒','治療生命比例最低隊友，攻擊力200%'],
['sela','疾風雙刃 賽菈','SR','sword',275,37,1.05,.05,1.1,'交錯刃','疾風亂舞','單體四斬，每斬75%傷害'],
['leon','蒼雷神射手 雷昂','SR','archer',205,39,.85,.03,4,'雷紋箭','蒼雷連鎖','最多三人，160%／100%／70%傷害'],
['sylphie','月影獵姬 希爾菲','SR','archer',195,45,.70,.03,4.5,'月影箭','貫月狙擊','蓄力後單體320%傷害'],
['iris','冰晶魔女 艾莉絲','SR','mage',200,43,.65,.03,3.5,'冰晶彈','霜晶綻放','範圍180%傷害，冰凍0.8秒及減速20%兩秒']];
const roles={sword:'劍士',archer:'弓箭手',mage:'法師'};
const heroes=rows.map(([id,name,rarity,type,hp,dmg,speed,armor,range,basic,ultimate,description],i)=>({id,name,rarity,role:roles[type],battleId:12+i,portrait:`assets/characters/${id}-portrait.webp`,sprite:`assets/characters/${id}-chibi.webp`,battle:{type,variant:id},stats:{hp,dmg,delay:1/speed,armor,range},skills:{basic,ultimate,description}}));
const api={heroes,byId:Object.fromEntries(heroes.map(h=>[h.id,h]))};if(typeof module!=='undefined')module.exports=api;else root.CharacterData=api;
})(globalThis);
