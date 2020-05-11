const responseHandler = require('../responseHandler');
const basicAuth = require('../middleware/basicAuth');

const v1Route = require('../module/v1/route');

module.exports = function(app){
    
    // Attach V1 Routes
    app.use(basicAuth.basicAuthentication);
    app.use('/api/v1', v1Route);
    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.handleError);

}