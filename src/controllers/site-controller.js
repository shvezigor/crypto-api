

export const  homePage = async (req, res)=>{
    console.log("get home pages")
    res.send("<html> <head>server Response CRYPTO API</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
    //res.json(data);
}

export const  verifyDomain = async (req, res)=>{
    console.log("domain Verification")
    res.send("cryptoapis-cb-84f442176185328f40da87be119f35192f5d96a6f0f0e31a0d101f2a758ca87e");
    //res.json(data);
}
