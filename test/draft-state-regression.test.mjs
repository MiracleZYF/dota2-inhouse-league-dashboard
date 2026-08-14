import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const backendSource = await readFile(new URL("../functions/_lib/dota.js", import.meta.url), "utf8");

test("选人页不会启动后台轮询覆盖编辑状态", () => {
  assert.match(
    appSource,
    /if \(!backendReady \|\| activeView === "draft" \|\| activeView === "playoff"\) return undefined;/,
  );
});

test("选人顺位从已保存的赛季进度恢复，而非固定归零", () => {
  const draftView = appSource.slice(appSource.indexOf("function DraftView"), appSource.indexOf("function PlayoffTeamManager"));
  assert.match(draftView, /const initialCursor = Math\.min\(Math\.max\(normalizePlayoff\(playoff\)\.draftProgress\.cursor/);
  assert.doesNotMatch(draftView, /setCursor\(0\)/);
  assert.match(draftView, /await onSaveDraftProgress\?\.\(/);
});

test("保存选人进度不会把自定义赛程序列化成展示对象", () => {
  assert.match(backendSource, /series: normalized\.series,/);
  assert.match(backendSource, /games: normalized\.games,/);
});
