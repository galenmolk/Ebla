// Load up our route for users.
const abilityRoutes = require('./abilities');

const appRouter = (app, fs) => {
   // We've added in a default route here that handles
   //empty routes at the base API url.
   app.get('/', (req, res) => {
       res.send('Welcome to Ebla.');
   });
   
   // Run our user route module here to complete the wire up.
    abilityRoutes(app, fs);
};

module.exports = appRouter;
