

export const  homePage = async (req, res)=>{
    console.log("get home pages")
    res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
    //res.json(data);
}
