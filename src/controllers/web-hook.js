

export const  minedTransaction = async (req, res)=>{
    try {
        console.log("minedTransaction", req)
        //console.log("minedTransaction", res)

        const response = JSON.parse(req);
        console.log("minedTransaction", response)

        let result = {};

        res.json(result);
    }catch (error) {
        console.log(error);
        res.json(error);
    }
}

