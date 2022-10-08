import { Bootstrapper } from "./components/Bootstrap";

const bootstrap = new Bootstrapper();

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
