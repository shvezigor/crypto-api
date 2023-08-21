
import {
    getSessionToken,
    sharingDocument,
    createOfferRequest
} from "../api/diya.js";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import MyRedisClient from "../redis.js";

dotenv.config();


export const  getDipLink = async (req, res)=>{

    try {
        console.log("get dip link")

        const sessionToken = await getSessionToken();
        let requestId = uuidv4();
        const params = {
            "branchId": process.env.BRANCH_ID,
            "qrcode": "qrcode",
            "requestId": requestId
        }

        console.log("params", params)
        const redisClient = new MyRedisClient();
        await redisClient.set("requestId", requestId);
        let redistRes = await redisClient.get("requestId");
        console.log("redistRes", redistRes);

        let result = await sharingDocument(sessionToken,  params);

        res.json(result);
    }catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const  fileUpload = async (req, res)=>{

    const sessionToken = await getSessionToken();

    let requestId = uuidv4();
    const params = {
        "branchId": process.env.BRANCH_ID,
        "qrcode": "qrcode",
        "requestId": requestId
    }

    console.log(params);

    let result = await sharingDocument(sessionToken,  params);

    res.json(result);
}

export const  sharingDocuments = async (req, res)=>{

    const sessionToken = await getSessionToken();

    let requestId = uuidv4();
    const params = {
        "branchId": process.env.BRANCH_ID,
        "qrcode": "qrcode",
        "requestId": requestId
    }

    console.log(params);

    let result = await createOfferRequest(sessionToken,  params);

    res.json(result);
}