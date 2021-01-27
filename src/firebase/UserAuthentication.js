import {firebase} from './config';

module.exports.UserAuthentication = class UserAuthentication{

    /**
     * Creates a new user account if it is a ble to
     * @param email the email associated with the account
     * @param password the password associated with the account
     * @returns {Promise<object>} if the account create worked, returns:<p>
     * {<p>
     *     confirmed: true,<p>
     *     credentials: user credentials<p>
     * }<p>
     * if sign in was invalid:<p>
     * {<p>
     *     confirmed: false,<p>
     *     code: error code,<p>
     *     message: error message<p>
     * }     */
    static async createAccount(email, password){

        const responseData = {};
        return await new Promise(resolve => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredentials => {
                responseData.confirmed = true;
                responseData.credentials = userCredentials;
                resolve(responseData);
            }).catch((err) => {
                responseData.confirmed = false;
                responseData.code = err.code;
                responseData.message = err.message;
                resolve(responseData);
            })
        });

    }

    /**
     * Signs in a user to their account
     * @param email the email to their account
     * @param password the password to their account
     * @returns {Promise<object>} if the sign in worked, returns:<p>
     * {<p>
     *     confirmed: true,<p>
     *     credentials: user credentials<p>
     * }<p>
     * if sign in was invalid:<p>
     * {<p>
     *     confirmed: false,<p>
     *     code: error code,<p>
     *     message: error message<p>
     * }
     */
    static async signInWithEmailAndPassword(email, password){
        const responseData = {}
        return await new Promise(resolve => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(userCreds => {
                responseData.confirmed = true;
                responseData.credentials = userCreds;
                resolve(responseData)
            }).catch(err => {
                responseData.confirmed = false;
                responseData.code = err.code;
                responseData.message = err.message;
                resolve(responseData);
            })
        });

    }

}