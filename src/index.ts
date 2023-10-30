import {ApplicationConfig, MicroCatalogApplication} from './application';
import './bootstrap';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new MicroCatalogApplication(options);
  await app.boot();
  await app.start();
  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
