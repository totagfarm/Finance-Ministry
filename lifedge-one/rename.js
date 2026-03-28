const fs = require('fs');

const replacements = [
  { regex: /Liberia Integrated Financial and Economic Data edge \(LIFEDge One\)/gi, replacement: 'Transparent Resource Allocation, Control & Execution (TRACE)' },
  { regex: /LIFEDge<span className="text-brand-gold">One<\/span>/g, replacement: 'TRA<span className="text-brand-gold">CE</span>' },
  { regex: /lifedge-demo/g, replacement: 'trace-demo' },
  { regex: /lifedge-ui-theme/g, replacement: 'trace-ui-theme' },
  { regex: /lifedge\.gov\.lr/gi, replacement: 'trace.gov.lr' },
  { regex: /lifedge\.mfdp\.gov\.lr/gi, replacement: 'trace.mfdp.gov.lr' },
  { regex: /LIFEDge One/gi, replacement: 'TRACE' },
  { regex: /LIFEDgeOne/gi, replacement: 'TRACE' },
  { regex: /LIFedge One/gi, replacement: 'TRACE' },
  { regex: /LIFedge/gi, replacement: 'TRACE' },
  { regex: /lifedge/gi, replacement: 'trace' }
];

const files = [
  'src/pages/Contact.tsx',
  'src/pages/LandingPage.tsx',
  'src/pages/GlobalShell.tsx',
  'src/pages/auth/Register.tsx',
  'src/pages/auth/Login.tsx',
  'src/pages/About.tsx',
  'src/components/ThemeProvider.tsx',
  'src/pages/admin/SystemSettings.tsx',
  'src/App.tsx',
  'metadata.json',
  'index.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    replacements.forEach(r => {
      if (content.match(r.regex)) {
        content = content.replace(r.regex, r.replacement);
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated ' + file);
    }
  } else {
    console.log('File not found: ' + file);
  }
});
