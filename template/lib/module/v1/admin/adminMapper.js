/**
 * This file will have admin request and response object mappings.
 */

"use strict";


function loginMapping(admin, jwt) {
    var respObj = {
        "message": "Successfully Login",
        "accessToken": jwt,
        "adminProfile": {
            "_id": admin._id,
            "name": admin.name,       
            "email": admin.adminEmail,
            "isVerifiedUser": admin.isVerified, 
        }
    }
    return respObj;
}



module.exports = {
    loginMapping
}

