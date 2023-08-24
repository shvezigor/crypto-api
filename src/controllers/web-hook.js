

export const  minedTransaction = async (req, res)=>{
    try {
        console.log("minedTransaction", req.body)
        console.log("minedTransaction", req.body.data)
        console.log("minedTransaction", req.body.data.item.transactionId)


        //let result = {};

        res.json(req.body.data.item.transactionId);
    }catch (error) {
        console.log(error);
        res.json(error);
    }
}

