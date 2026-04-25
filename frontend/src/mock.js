export const COMPANIES = [
  { id: 'acme', name: 'Acme Manufacturing Sdn Bhd' },
  { id: 'placeholder-1', name: '— Placeholder Co. 1 —', disabled: true },
  { id: 'placeholder-2', name: '— Placeholder Co. 2 —', disabled: true },
]

export const MATRIX = [
  { metric: 'Revenue (FY2025)', value: 'MYR 48.2M', source: 'Audited FS 2025.pdf' },
  { metric: 'EBITDA', value: 'MYR 9.6M', source: 'Audited FS 2025.pdf' },
  { metric: 'EBITDA Margin', value: '19.9%', source: 'derived' },
  { metric: 'Net Debt', value: 'MYR 4.1M', source: 'Balance Sheet 2025.xlsx' },
  { metric: 'EV / EBITDA (peer)', value: '6.5x', source: 'Peer Comps.xlsx' },
  { metric: 'Implied EV', value: 'MYR 62.4M', source: 'derived' },
  { metric: 'DCF (base case)', value: 'MYR 58.9M', source: 'DCF_Model_v3.xlsx' },
  { metric: 'Equity Value (mid)', value: 'MYR 56.6M', source: 'derived' },
  { metric: 'WACC', value: '11.2%', source: 'DCF_Model_v3.xlsx' },
  { metric: 'Terminal Growth', value: '2.5%', source: 'DCF_Model_v3.xlsx' },
]

export const FINDINGS = [
  { severity: 'high', category: 'Customer concentration', quote: '"Top 3 customers represent 61% of FY2025 revenue."', file: 'Mgmt Presentation.pdf', page: 14 },
  { severity: 'med',  category: 'Working capital',        quote: '"DSO increased from 58 to 92 days over FY23–FY25."', file: 'Audited FS 2025.pdf', page: 31 },
  { severity: 'high', category: 'Tax exposure',           quote: '"Pending GST audit for periods 2022–2024; provision MYR 1.8M."', file: 'Tax Memo Aug 2025.pdf', page: 4 },
  { severity: 'low',  category: 'Related party',          quote: '"Lease of HQ from director-owned entity at market rate."', file: 'Notes to FS.pdf', page: 22 },
  { severity: 'med',  category: 'CapEx',                  quote: '"Plant upgrade of MYR 6M scheduled FY2026, not yet committed."', file: 'CapEx Plan.xlsx', page: 1 },
  { severity: 'high', category: 'Key person',             quote: '"COO holds sole supplier relationships; no documented succession."', file: 'HR Review.docx', page: 7 },
]

export const FILES = [
  { name: 'Audited FS 2025.pdf',         size: '2.4 MB',  modified: '2026-03-12', folder: '01_Financials',  type: 'pdf'  },
  { name: 'Audited FS 2024.pdf',         size: '2.1 MB',  modified: '2025-04-02', folder: '01_Financials',  type: 'pdf'  },
  { name: 'Balance Sheet 2025.xlsx',     size: '180 KB',  modified: '2026-03-15', folder: '01_Financials',  type: 'xlsx' },
  { name: 'DCF_Model_v3.xlsx',           size: '420 KB',  modified: '2026-04-05', folder: '02_Valuation',   type: 'xlsx' },
  { name: 'Peer Comps.xlsx',             size: '95 KB',   modified: '2026-04-01', folder: '02_Valuation',   type: 'xlsx' },
  { name: 'Mgmt Presentation.pdf',       size: '6.8 MB',  modified: '2026-03-28', folder: '03_Commercial',  type: 'pdf'  },
  { name: 'Customer List.xlsx',          size: '70 KB',   modified: '2026-02-10', folder: '03_Commercial',  type: 'xlsx' },
  { name: 'Tax Memo Aug 2025.pdf',       size: '320 KB',  modified: '2025-08-22', folder: '04_Tax',         type: 'pdf'  },
  { name: 'Notes to FS.pdf',             size: '1.1 MB',  modified: '2026-03-12', folder: '01_Financials',  type: 'pdf'  },
  { name: 'CapEx Plan.xlsx',             size: '60 KB',   modified: '2026-01-18', folder: '05_Operations',  type: 'xlsx' },
  { name: 'HR Review.docx',              size: '210 KB',  modified: '2026-02-25', folder: '06_HR',          type: 'docx' },
  { name: 'Material Contracts.pdf',      size: '4.2 MB',  modified: '2026-03-30', folder: '07_Legal',       type: 'pdf'  },
]

export const INITIAL_CHAT = [
  { role: 'assistant', content: 'Hi — I have read the DD pack for **Acme Manufacturing**. Ask me anything about the valuation, risks, or specific line items.' },
]
