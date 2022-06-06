import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json') as any);

export const apiDocSpec = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'tsoa-inheritance-poc APIs',
      version: pkg.version,
      description: pkg.description,
      license: {
        name: 'License',
        url: '/license',
      },
      contact: {
        name: pkg.author,
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    './src/index.ts',
    './src/routes/**.ts',
    './src/routes/*/**.ts'
  ],
  tags: [
    'tsoa-inheritance-poc API',
    'Account User Settings',
    'Layout Views',
    'Layout Tiles'
  ],
};

export const cssOptions = {
  customCss: `
    .topbar-wrapper img {content:url(https://github.com/lukeautry/tsoa); width:85px; height:auto;}
    .swagger-ui .topbar { background-color: #000000; 
    border-bottom: 4px solid #5dc6d1; }`,
  customSiteTitle: 'tsoa-inheritance-poc APIs',
  customfavIcon: '',
};
