import registerUser from "../models/Register.js";

export const emailVerification = async (req, res) => {
    try{
        const { token } = req.query;
        
        if(!token){
            return res.status(400).send({message:"Invalid or missing token"});
        }

        const user = await registerUser.findOne({ verificationToken: token });
        if(!user){
            return res.status(400).send({message:"Invalid or expired token"});
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        await user.save();

        return res.redirect(`${process.env.FRONTEND_URL}login`);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong", error:err.message});
    }
}