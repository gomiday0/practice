// src/data/utils.ts
import { parse } from 'node-html-parser';

export function extractTypeFromHtml(html: string): string {
  const root = parse(html);
  const selectedType = root.querySelector('.skill_select .select_true');
  return selectedType?.classNames.includes('hot') ? 'hot' : 'other';
}
