import { q } from '../db.js'

const PER_FILE_CAP = 30_000
const TOTAL_CAP = 400_000

/**
 * Build a single text corpus from all extracted DD files for a company.
 * Returns { text, fileCount, charCount, files: [{name, folder_path}] }
 */
export async function buildCorpus(companyId) {
  const { rows } = await q(
    `SELECT name, folder_path, mime_type, extracted_text
       FROM dd_files
      WHERE company_id = $1 AND extracted_text IS NOT NULL AND length(extracted_text) > 0
      ORDER BY folder_path NULLS LAST, name`,
    [companyId]
  )

  let total = 0
  const chunks = []
  const files = []
  for (const r of rows) {
    if (total >= TOTAL_CAP) break
    const remaining = TOTAL_CAP - total
    const slice = r.extracted_text.slice(0, Math.min(PER_FILE_CAP, remaining))
    chunks.push(`\n\n========= FILE: ${r.name} (${r.folder_path || '/'}) =========\n${slice}`)
    files.push({ name: r.name, folder_path: r.folder_path })
    total += slice.length
  }
  return { text: chunks.join('\n'), fileCount: files.length, charCount: total, files }
}
