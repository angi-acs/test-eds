// Renders tools/replica/progress.html from stardust/replica/progress-page.json (owner status page).
import { readFileSync, writeFileSync } from 'node:fs';
const run = JSON.parse(readFileSync('stardust/.labs/run.json', 'utf8'));
const s = JSON.parse(readFileSync('stardust/replica/progress-page.json', 'utf8'));
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const badge = (state) => {
  const cls = { Done: ' spectrum-badge--positive', Ready: ' spectrum-badge--positive', 'In progress': ' spectrum-badge--informative', 'Needs attention': ' spectrum-badge--notice', Yes: ' spectrum-badge--positive', Checking: ' spectrum-badge--informative' }[state] || '';
  return `<span class="spectrum-badge${cls}">${esc(state)}</span>`;
};
// steps: [{name, state}] in journey order; weights 10,10,40,10,30
const weights = [10, 10, 40, 10, 30];
const templates = s.templates || [];
const pages = s.pages || [];
const migrated = pages.filter((p) => p.ready).length;
const stepFraction = (i) => {
  const st = s.steps[i].state;
  if (st === 'Done') return 1;
  if (st === 'Upcoming') return 0;
  if (i === 2 && templates.length) return templates.filter((t) => t.status === 'Done').length / templates.length;
  if (i === 4 && pages.length) return migrated / pages.length;
  return s.steps[i].fraction ?? 0;
};
let pct = 0;
for (let i = 0; i < 5; i++) pct += weights[i] * stepFraction(i);
pct = Math.round(pct);
const now = new Date();
const started = new Date(run.startedAt);
const deadline = new Date(run.deadlineAt);
let estimate = 'Estimating…';
if (pct >= 100) estimate = 'Complete';
else if (pct >= 10) {
  const elapsedMin = (now - started) / 60000;
  const remainMin = elapsedMin * (100 - pct) / pct;
  const q = (m) => Math.max(15, Math.round(m / 15) * 15);
  const lo = Math.min(q(remainMin * 0.8), Math.max(0, (deadline - now) / 60000));
  const hi = Math.min(q(remainMin * 1.3), Math.max(0, (deadline - now) / 60000));
  const fmt = (m) => { m = Math.round(m / 15) * 15; const h = Math.floor(m / 60), r = m % 60; return h ? `${h} h${r ? ` ${r} min` : ''}` : `${r} min`; };
  const hi2 = hi <= lo ? Math.min(lo + 15, Math.max(0, (deadline - now) / 60000)) : hi;
  estimate = hi2 <= lo ? `About ${fmt(lo)} remaining` : `About ${fmt(lo)} to ${fmt(hi2)} remaining`;
}
const ts = now.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const overall = s.overall || 'In progress';
const open = pages.length > 12 ? '' : ' open';
const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Migration status</title>
<link rel="stylesheet" href="spectrum.css">
<style>
  body { background-color: var(--spectrum-bg-app); }
  main { max-width: 760px; margin: 0 auto; padding: 40px 24px 64px; }
  header { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .meta { color: var(--spectrum-text-subdued); margin: 0 0 24px; }
  .spectrum-panel { margin-bottom: 16px; }
  .spectrum-panel-header { margin: 0; padding: 0 16px; }
  .panel-body { padding: 16px; }
  .panel-body > :last-child { margin-bottom: 0; }
  .bar { height: 8px; border-radius: 9999px; background-color: var(--spectrum-gray-200); overflow: hidden; }
  .bar span { display: block; height: 100%; background-color: var(--spectrum-accent-bg); }
  .estimate { color: var(--spectrum-text-subdued); margin: 8px 0 0; }
  ol.steps { list-style: none; padding: 0; margin: 0; }
  ol.steps li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; }
  ol.steps li + li { border-top: 1px solid var(--spectrum-gray-200); }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 8px; text-align: left; border-bottom: 1px solid var(--spectrum-gray-200); }
  th { color: var(--spectrum-text-subdued); font-weight: 700; }
  ul.pages { margin: 8px 0 0; padding-left: 20px; }
</style>
</head>
<body>
<main>
  <header>
    <h1>Migration status</h1>
    ${badge(overall)}
  </header>
  <p class="meta">Source site: <a href="${esc(run.scope.sourceUrl)}">${esc(run.scope.sourceUrl)}</a><br>Preview site: <a href="${esc(run.previewUrl)}">${esc(run.previewUrl)}</a><br>Last updated: ${ts}</p>

  <section class="spectrum-panel">
    <h2 class="spectrum-panel-header">Journey</h2>
    <div class="panel-body">
      <ol class="steps">
${s.steps.map((st) => `        <li>${esc(st.name)}${badge(st.state)}</li>`).join('\n')}
      </ol>
    </div>
  </section>

  <section class="spectrum-panel">
    <h2 class="spectrum-panel-header">Page templates</h2>
    <div class="panel-body">
      <table>
        <thead><tr><th>Template</th><th>Pages</th><th>Desktop</th><th>Mobile</th><th>Status</th></tr></thead>
        <tbody>
${templates.map((t) => `          <tr><td>${esc(t.name)}</td><td>${t.pages}</td><td>${badge(t.desktop)}</td><td>${badge(t.mobile)}</td><td>${badge(t.status)}</td></tr>`).join('\n') || '          <tr><td colspan="5">Templates will appear here once your site has been analyzed.</td></tr>'}
        </tbody>
      </table>
    </div>
  </section>

  <section class="spectrum-panel">
    <h2 class="spectrum-panel-header">Pages migrated</h2>
    <div class="panel-body">
      <p>${migrated} of ${pages.length} pages are ready on the preview site.</p>
      <details${open}>
        <summary>Ready pages</summary>
        <ul class="pages">
${pages.filter((p) => p.ready).map((p) => `          <li><a href="${esc(p.url)}">${esc(p.title || p.url)}</a></li>`).join('\n') || '          <li>No pages are ready yet.</li>'}
        </ul>
      </details>
    </div>
  </section>

  <section class="spectrum-panel">
    <h2 class="spectrum-panel-header">Progress</h2>
    <div class="panel-body">
      <div class="bar"><span style="width: ${pct}%"></span></div>
      <p class="estimate">${pct}% complete · ${esc(estimate)}</p>
    </div>
  </section>

  <section class="spectrum-panel">
    <h2 class="spectrum-panel-header">What's happening now</h2>
    <div class="panel-body">
      <p>${esc(s.now)}</p>${s.attention ? '\n      <p>Some pages need a closer look; we\'re on it.</p>' : ''}
    </div>
  </section>

  <section class="spectrum-panel">
    <h2 class="spectrum-panel-header">What's next</h2>
    <div class="panel-body">
      <p>${esc(s.next)}</p>
    </div>
  </section>
</main>
</body>
</html>
`;
writeFileSync('tools/replica/progress.html', html);
console.log(`progress.html written: ${pct}% — ${estimate}`);
