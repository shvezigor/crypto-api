

export const  homePage = async (req, res)=>{
    console.log("get home pages")
    res.send("<html> <head>server Response CRYPTO API</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
}

export const  verifyDomain = async (req, res)=>{
    console.log("domain Verification")
    //res.send("cryptoapis-cb-e7e776a8f6d62ca342717171bbf8764d288c838ce0082516a9d3f53d62f2237b");
    res.send("cryptoapis-cb-e63e9980fdedbfb4a244794f72cd984eb78e31678975b3b627b0ff51aab90d1e");
}
