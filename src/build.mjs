import { readFileSync, writeFileSync } from 'node:fs';
import { variants } from './variants.mjs';

const tpl = readFileSync('src/template.css', 'utf8');

for (const v of variants) {
  const out = tpl.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    if (key === 'name') return v.name;
    const [mode, token] = key.split('.');
    const value = v[mode]?.[token];
    if (value === undefined) throw new Error(`missing value '${key}' for variant '${v.name}'`);
    return value;
  });
  if (out.includes('{{')) throw new Error(`unsubstituted placeholder remains for variant '${v.name}'`);
  writeFileSync(`TangerineBlue${v.suffix}.css`, out);
  console.log(`built TangerineBlue${v.suffix}.css`);
}
