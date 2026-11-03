# 星之祈願：星界遠征
完整靜態遊戲交接包，基準為 2026-11-03 的 Sites v33。

先讀 **CODEX_HANDOFF.md**。

## 預覽
```sh
python3 -m http.server 4173 --directory dist --bind 0.0.0.0
```
開啟 http://localhost:4173/ 。Windows 若 python3 不存在，改用 `py -m http.server 4173 --directory dist --bind 0.0.0.0`。

## 測試
```sh
node --test tests/*.cjs
```
交接時 9 個測試檔全數通過。

## GitHub 匯入
完整 v33 已匯入 https://github.com/TMHfred/star-wish-expedition 。現在可在 Codex 直接選擇此儲存庫開始。
dist、tests、README.md、AGENTS.md、CODEX_HANDOFF.md 已位於儲存庫根目錄。
完整素材約 67 MB。使用 GitHub Desktop 或 Codex 複製此儲存庫即可，不需要另外匯入 ZIP。
請先在 Codex 建立本機預覽並執行測試；這次未開啟 GitHub Pages，也未變更原 Sites 測試站。
