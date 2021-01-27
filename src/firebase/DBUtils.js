import { firebase, firestore, storage } from "./config";
import crypto from 'crypto';

module.exports.DB = class DB{

    constructor() {
        this.database = firebase.database();
    }



}