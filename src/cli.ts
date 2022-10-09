import { Bootstrapper } from "./bootstrap/Bootstrap";

const bootstrap = new Bootstrapper("CLI");

bootstrap
  .main()
  .then((rc) => {
    console.info("END with rc", rc);
    process.exit(rc);
  })
  .catch((e) => {
    console.error("FATAL", e);
    process.exit(1);
  });
