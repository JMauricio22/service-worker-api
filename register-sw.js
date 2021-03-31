const register = () => {
  if ("serviceWorker" in navigator) {
    console.log("Registering service worker");
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((register) => {
        console.log("Registration succeeded. Scope is " + register.scope);
      })
      .catch((error) => {
        console.log("Registration failed with " + error);
      });
  }
};
