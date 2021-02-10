import * as express from 'express';

class UserController{
    async get(req : express.Request, res: express.Response){
        try{
            res.send("All good!");
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
}

export default new UserController();