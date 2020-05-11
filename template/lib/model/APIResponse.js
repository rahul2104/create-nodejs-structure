var constant = require('../constant');
const config = require('../config');

class APIResponse {
    constructor(statusCode, result,request){
        this.statusCode = statusCode;
        if(statusCode == constant.STATUS_CODE.SUCCESS){
            result.message=result.message?result.message:"Api Result";
            result ? this.responseData = result : constant.EMPTY;
        }else{
            result ? this.error = result : constant.EMPTY;
        }
        if (config.cfg.debug===true||config.cfg.debug==="true") {
            this.requestParams=request.body;
        }
        this.time = new Date();
    }
}

// ========================== Export Module Start ==========================
module.exports = APIResponse;
// ========================== Export Module End ============================