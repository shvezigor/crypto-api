

export const  homePage = async (req, res)=>{
    console.log("get home pages")
    res.send("<html> <head>server Response CRYPTO API</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
    //res.json(data);
}

export const  verifyDomain = async (req, res)=>{
    console.log("domain Verification")
    res.send("cryptoapis-cb-e7e776a8f6d62ca342717171bbf8764d288c838ce0082516a9d3f53d62f2237b");
    //res.json(data);
}
