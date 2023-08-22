

export const  minedTransaction = async (req, res)=>{

    try {
        console.log("minedTransaction", req)


        let result = {};

        res.json(result);
    }catch (error) {
        console.log(error);
        res.json(error);
    }
}

