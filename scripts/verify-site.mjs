import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docs = resolve(root, 'docs');
const read = (name) => readFileSync(resolve(root, name), 'utf8');
const game = JSON.parse(read('docs/data/taluma.json'));
const archive = JSON.parse(read('docs/data/stories.json'));
assert.ok(Array.isArray(archive.stories) && archive.stories.length >= 6, 'Six or more archived chapters required');
assert.equal(new Set(archive.stories.map(s => s.id)).size, archive.stories.length, 'Duplicate chapter IDs');
for (const story of archive.stories) {
  assert.match(story.id, /^y[0-9]+-d[0-9]+$/);
  assert.ok(story.title && story.deck && story.sections.length >= 2);
  assert.ok(story.sections.every(sec => sec.heading && sec.paragraphs.length >= 2));
  assert.ok(existsSync(resolve(docs, 'stories', story.id + '.md')), 'Missing GitHub-readable chapter: ' + story.id);
}
const readerJS = read('docs/story-reader.js');
new vm.Script(readerJS, {filename:'docs/story-reader.js'});

assert.equal(game.game, 'Empires of Dust');
assert.equal(game.campaign_id, 'taluma-the-hollow-coast-4000bce');
assert.ok(game.date && Number.isInteger(game.date.elapsed_year));
assert.ok(game.civilization && game.resources);
const c = game.civilization;
assert.ok(Number.isInteger(c.population) && c.population > 0);
assert.ok(c.housing_capacity >= c.population);
assert.ok(c.census, 'Missing census');
assert.equal(c.census.working_age_adults + c.census.children + c.census.elders, c.population);
assert.ok(game.resources.food_days >= 0 && game.resources.wood_fuel_days >= 0);
assert.ok(Array.isArray(game.chronicle) && game.chronicle.length > 0);
assert.ok(Array.isArray(game.named_people));
assert.ok(Array.isArray(game.workforce_and_projects.active_projects));

for (const page of ['docs/index.html', 'docs/play.html', 'docs/stories.html']) {
  const html = read(page);
  assert.match(html, /<title>[^<]+<\/title>/i);
  for (const [, url] of html.matchAll(/<(?:a|link|script)\b[^>]*\b(?:href|src)=["']([^"']+)["']/gi)) {
    if (/^(?:#|https?:|mailto:|data:|javascript:)/i.test(url) || url.includes('${')) continue;
    const pathname = url.split(/[?#]/)[0];
    if (!pathname) continue;
    const target = resolve(docs, pathname);
    assert.ok(target.startsWith(docs + sep), 'Link escapes docs: ' + url);
    assert.ok(existsSync(target), 'Broken local link: ' + page + ' -> ' + url);
  }
}

for (const page of ['docs/index.html','docs/play.html','docs/stories.html']) {
  const pageHtml=read(page);
  assert.match(pageHtml,/Follow @thewebbie/, 'Creator social links missing on '+page);
  for(const domain of ['x.com/thewebbie','instagram.com/thewebbie','facebook.com/thewebbie'])
    assert.ok(pageHtml.includes(domain), 'Missing social account '+domain+' in '+page);
}

const html = read('docs/index.html');
const script = html.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i)?.[1];
assert.ok(script, 'Missing dashboard script');
new vm.Script(script, { filename: 'docs/index.html' });
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate element IDs');
for (const [, id] of script.matchAll(/\$\('([^']+)'\)/g))
  assert.ok(ids.includes(id), 'Missing HTML element: ' + id);

function element(id = '') {
  return { id, value: '', textContent: '', innerHTML: '', style: {}, dataset: {},
    events: {}, classList: { toggle() {} },
    addEventListener(type, handler) { this.events[type] = handler; },
    select() {}, remove() {} };
}
const els = new Map(ids.map((id) => [id, element(id)]));
const nav = [...html.matchAll(/<button\b[^>]*data-view=["']([^"']+)["']/gi)]
  .map((m) => Object.assign(element(), { dataset: { view: m[1] } }));
const jump = [...html.matchAll(/data-goto=["']([^"']+)["']/gi)]
  .map((m) => Object.assign(element(), { dataset: { goto: m[1] } }));
assert.ok(nav.length >= 5, 'Navigation tabs missing');
const document = {
  getElementById(id) { return els.get(id) || null; },
  querySelectorAll(q) { return q === '.nav button' ? nav : q === '[data-goto]' ? jump : []; },
  createElement() { return element(); },
  body: { appendChild() {} },
  execCommand() { return true; }
};
const fetch = async (url) => {
  assert.ok(['data/taluma.json', 'data/stories.json'].includes(url), 'Unexpected fetch: '+url);
  return { ok: true, json: async () => url === 'data/taluma.json' ? game : archive };
};
vm.runInNewContext(script, {
  document, fetch, window: { scrollTo() {} },
  navigator: { clipboard: { writeText: async () => {} } },
  setTimeout() {}, console
}, { filename: 'docs/index.html', timeout: 3000 });
await new Promise((done) => setImmediate(done));
const get = (id) => els.get(id);
assert.match(get('era').textContent, new RegExp('Year ' + game.date.elapsed_year));
assert.match(get('saveState').textContent, /Public save:/);
assert.ok(get('kpis').innerHTML.includes(String(c.population)), 'Population tile missing');
assert.ok(get('peopleList').innerHTML.includes('Esha'), 'People not rendered');
assert.ok(get('projectList').innerHTML.length > 200, 'Projects not rendered');
assert.ok(get('chronicleList').innerHTML.length > 200, 'Chronicle not rendered');
assert.ok(get('contacts').innerHTML.length > 100, 'Diplomacy not rendered');
assert.ok(get('storyGrid').innerHTML.includes(archive.stories[0].title), 'Story archive not rendered');
assert.ok(get('featuredStory').innerHTML.includes('stories.html?turn='), 'Featured chapter not linked');
for (const button of nav) {
  assert.ok(button.events.click, 'Navigation not wired: ' + button.dataset.view);
  button.events.click();
}
console.log('Verified: Taluma data, internal links, dashboard script, initial render, all navigation tabs.');
