import {firebase} from './config';

module.exports.UserAuthentication = class UserAuthentication{


    /**
     * Signs a user in with an email and password
     * @param email the email to sign in with
     * @param password the password to sign in with
     * @returns {Promise<object>}  if the sign in worked, returns:<p>
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
    static async signUserIn(email, password){

        console.log(6);
        return await new Promise(resolve => {
            const responseData = {};

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    responseData.confirmed = true;
                    responseData.credentials = userCredential.user;
                    resolve(responseData);
                }).catch((err) => {
                    responseData.confirmed = false;
                    responseData.code = err.code;
                    responseData.message = err.message;
                    resolve(responseData);
                });
        });

    }

    /**
     * Checks the database if a user by username exists
     * @param name the name of the user to check
     * @returns {Promise<boolean>} a boolean of if it exists (false) or not (true)
     */
    static async isUnknownUsername(name){

        const reference = firebase.database().ref("users/"+name);
        return await new Promise((resolve) => {
             reference.once('value', snap => {
                 resolve(snap.val() == null)
            }).catch(() => {
                resolve(false)
            });
        });
     }

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
     * }
     * */
    static async createAccount(email, password){

        console.log(email, password)
        const responseData = {};
        return await new Promise(resolve => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredentials => {
                responseData.confirmed = true;
                responseData.credentials = userCredentials.user;
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