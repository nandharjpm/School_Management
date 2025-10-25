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

const getLocationView = async(req, res) => {
    try{
        const locationView = await Location.findById(req.params.id);
        if(!locationView){
            res.status(400).json({message:"Location Not Found"});
        }
        res.status(200).json({locationView});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


const getLocationEdit = async(req,res) => {
    try{
        const editLocation = await Location.findById(req.params.id);
        if(!editLocation){
            res.status(404).json({message:"No Location were Found"});
        }
        res.status(200).json({editLocation});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const UpdateLocation = async(req, res) => {
    try{
        console.log(req.body);
        const {id, location} = req.body;
        await Location.findByIdAndUpdate(id, {location});
        res.status(201).json({message:"Location Updated Successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


export const locationMasterController = {
    storeLocation,getLocation, getLocationView, getLocationEdit, UpdateLocation
}