import fs from 'fs';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors'
import app from './app';
import middleware from './middleware/index';
import { errorHandler } from './middleware/ErrorHandler'
import routes from './routes/index';
import { apiDocSpec, cssOptions } from './documentation/apiDocGenerator';
import { RegisterRoutes } from './build/routes';
import tsoaConfig from './build/swagger.json';

const host = "localhost";
const port = 3000;;

function initRoutes(specs: any) {
  /**
   * Serve the OpenAPI swagger-ui documentation
   */
  // TODO: Delete api-docs route once tsoa migration is done
  app.use('/api-docs', swaggerUi.serveFiles(specs, {}), swaggerUi.setup(cssOptions));
  app.use('/docs', swaggerUi.serveFiles(tsoaConfig, {}), swaggerUi.setup(cssOptions));

  /**
   * Parsing and Validation
   */

  //Having one SPA Domain is different from having an array of SPA domains with only one member
  //As a result, we want to allow either, but only one at at ime.  Having SPA domains will trump having one SPA domain.

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.urlencoded({ extended: false }));

  // app.use(
  //  OpenApiValidator.middleware({
  //    apiSpec: specs,
  //    validateRequests: true,
  //    ignorePaths: (path: any) => {
  //      return ignorePathsOpenAPIValidation.includes(path)
  //      || path.startsWith('/mock/');
  //    },
  //  })
  // );

  /**
   * @openapi
   * /api-spec:
   *   get:
   *     summary: Serves an openapi 3.0.0 spec in yaml format.
   *     tags:
   *       - Documentation
   *     responses:
   *       200:
   *         description: Outputs openapi spec 3.0.0 in yaml format.
   */

  // app.get('/api-spec', (req, res) => {
  //   res.send(`${YAML.stringify(specs)}`);
  // });

  /**
   * @openapi
   * /license:
   *   get:
   *     summary: Serves the Software License in text format.
   *     tags:
   *       - Documentation
   *     responses:
   *       200:
   *         description: Outputs the Software License in text format.
   */

  app.get('/license', (req, res) => {
    res.send(fs.readFileSync('LICENSE', { encoding: 'utf-8' }));
  });

  /**
   * Middleware, major routing, error handling
   */
  app.use(middleware);

  // register tsoa routes
  RegisterRoutes(app);

  // register OpenAPI routes
  app.use('/', routes);
  app.use('*', (_req, _res, next) => {
    next(new Error());
  });

  // app.use((err: any, req: any, res: any, next: any) => {
  //  res.status(err.status || 500).json({
  //    message: err.message,
  //    errors: err.errors,
  //  });
  // });

  app.use(errorHandler);
}

/**
 * Init the documentation which is created async
 * before spawning the routes.
 */
async function initDocs() {
  try {
    const specs = await swaggerJsdoc(apiDocSpec);
    console.info('Server Ready');
    initRoutes(specs);
  } catch (err) {
    console.error(`Server failed to init: ${err}`);
  }
}

/**
 * Start the web server and run inits.
 */
function startServer() {
  app.listen(port, () => {
    console.info(`Listening to requests on ${host}:${port}`);
  });
  initDocs();
}

startServer();
