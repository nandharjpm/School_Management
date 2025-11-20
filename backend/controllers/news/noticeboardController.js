import Anouncement from '../../models/news/Anouncement'

const storeAnouncement = async (req, res) => {
    try{
        const {location} = req.body;
        if(!location){
            return res.status(400).json({message:"Anouncement is Required"});
        }

        const existingLocation = await Anouncement.findOne({location})
        if(existingLocation){
            return res.status(400).json({message:"Anouncement is alredy Exist"});
        }

        const createLocation = new Anouncement({
            location
        });
        await createLocation.save();
        res.status(201).json({message:"Anouncement is Created"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
}

const getAnouncement = async(req, res)=>{
    try{
        const locationData = await Anouncement.find();        
        res.status(200).json({locationData});
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
}

const getAnouncementView = async(req, res) => {
    try{
        const locationView = await Anouncement.findById(req.params.id);
        if(!locationView){
            res.status(400).json({message:"Anouncement Not Found"});
        }
        res.status(200).json({locationView});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


const getAnouncementEdit = async(req,res) => {
    try{
        const editLocation = await Anouncement.findById(req.params.id);
        if(!editLocation){
            res.status(404).json({message:"No Anouncement were Found"});
        }
        res.status(200).json({editLocation});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const UpdateAnouncement = async(req, res) => {
    try{
        const {id, location} = req.body;
        await Anouncement.findByIdAndUpdate(id, {location});
        res.status(201).json({message:"Anouncement Updated Successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const DeleteAnouncement =  async(req, res) => {
    try{
        const {id} = req.params;
        await Anouncement.delete({_id: id});
        res.status(200).json({message:"Anouncement Deleted Successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


export const noticeboardController = {
    storeAnouncement,getAnouncement, getAnouncementView, getAnouncementEdit, UpdateAnouncement, DeleteAnouncement
}