import'#lab'
eq('abc123'.match(/(\w*)/).slice(1),['abc123'])
eq('abc123'.match(/([a-z]*)/).slice(1),['abc'])
eq('ab甲乙12'.match(/\w*([\u4e00-\u9fa5]*)/).slice(1),['甲乙'])

const raw=String.raw,
zh=raw`\u4e00-\u9fa5`,en=raw`A-Za-z`
eq('ab甲乙12'.match(raw`\w*([${zh}]*)`).slice(1),['甲乙'])
eq('ab甲乙12'.match(raw`([${zh}${en}\d]*)`).slice(1),['ab甲乙12'])