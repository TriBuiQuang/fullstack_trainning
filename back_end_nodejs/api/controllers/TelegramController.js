import TG from "telegram-bot-api";
import appconstants from "../../config/app.js";

const api = new TG({ token: appconstants.telegram.token });

api.getMe().then(console.log).catch(console.err);

// Define your message provider
const mp = new TG.GetUpdateMessageProvider();

// Set message provider and start API
api.setMessageProvider(mp);
api.start()
   .then(() => {
      console.log("API is started");
   })
   .catch(console.err);

// Receive messages via event callback
api.on("update", (update) => {
   // update object is defined at
   // https://core.telegram.org/bots/api#update
   console.log(update);
});

export default api;
