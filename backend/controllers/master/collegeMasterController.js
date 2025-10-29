import College from "../../models/master/College.js";

const getCollege = async (req, res) => {
  try {
    const college_list = await College.find();
    res.status(200).json({ college_list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const storeCollege = async (req, res) => {
  try {
    const { college, location } = req.body;
    const existingCollege = await College.findOne({ college });

    if (!location) {
      return res.status(400).json({ message: "Location is Required" });
    }

    if (!college) {
      return res.status(400).json({ message: "College is Required" });
    }

    if (existingCollege) {
      return res.status(400).json({ message: "College is Alredy Exist" });
    }

    const saveCollege = new College({
      location_id: location,
      college,
    });

    await saveCollege.save();
    return res.status(201).json({ message: "College is Created Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const getCollegeEdit = async (req, res) => {
  try{
    const editCollege = await College.findById(req.params.id)
    console.log(editCollege);
    if(!editCollege){
      return res.status(404).json({message:"College No Found"});
    }
    return res.status(200).json({editCollege});
  }catch(err){
    return res.status(500).json({message:err});
  }
}


const updateCollege = async(req,res)=>{
  try{
    const{location, college} = req.body;

    if(!location){
      return res.status(400).json({message:"Location is Required"});
    }
    if(!college){
      return res.status(400).json({message:"College is Required"});
    }

    await College.findByIdAndUpdate()
  
  }catch(err){
    return res.status(500).json({err})
  }
}

export const collegeMasterController = {
  getCollege,
  storeCollege,
  getCollegeEdit,
  updateCollege
};
