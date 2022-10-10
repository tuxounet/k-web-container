import { Bootstrapper } from "./bootstrap/Bootstrap";

new Bootstrapper("CLI")
  .main()
  .then((rc) => {
    console.info("END with rc", rc);
    process.exit(rc);
  })
  .catch((e) => {
    console.error("FATAL", e);
    process.exit(1);
  });
