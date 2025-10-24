import Location from '../../models/master/Location.js'

const storeLocation = async (req, res) => {
    try{
        const {location} = req.body;
        if(!location){
            return res.status(400).json({message:"Location is Required"});
        }

        const existingLocation = await Location.findOne({location})
        if(existingLocation){
            return res.status(400).json({message:"Location is alredy Exist"});
        }

        const createLocation = new Location({
            location
        });
        await createLocation.save();
        res.status(201).json({message:"Location is Created"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
}

const getLocation = async(req, res)=>{
    try{
        const locationData = await Location.find();
        res.status(200).json({locationData});
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
}


export const locationMasterController = {
    storeLocation,getLocation
}