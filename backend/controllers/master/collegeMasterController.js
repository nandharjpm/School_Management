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

    const saveCollege = new College({ location_id: location, college});

    await saveCollege.save();
    return res.status(201).json({ message: "College is Created Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCollegeEdit = async (req, res) => {
  try {
    const editCollege = await College.findById(req.params.id);
    console.log(editCollege);
    if (!editCollege) {
      return res.status(404).json({ message: "College No Found" });
    }
    return res.status(200).json({ editCollege });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const updateCollege = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, location, college } = req.body;

    if (!location) {
      return res.status(400).json({ message: "Location is Required" });
    }
    if (!college) {
      return res.status(400).json({ message: "College is Required" });
    }

    await College.findByIdAndUpdate(_id, {
      location_id: location,
      college: college,
    });
    return res.status(201).json({ message: "College is Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    await College.delete({ _id: id });
    res.status(200).json({ message: "Location Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const viewCollege = async (req, res) => {
  try {
    const collegeView = await College.findById(req.params.id);
    if (!collegeView) {
      res.status(400).json({ message: "College Not Found" });
    }
    res.status(200).json({ collegeView });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const locBasedCollege = async(req,res) => {
  try{
    const locationId = req.params.id;
    const getCollege = await College.find({location_id: locationId});    
    console.log(getCollege);
    
    if(!getCollege){
      return res.status(404).json({message:"College Not Found"});
    }
    return res.status(200).json({getCollege});
  }catch(err){
    return res.status(500).json({message:err});
  }
}

export const collegeMasterController = {
  getCollege,
  storeCollege,
  getCollegeEdit,
  updateCollege,
  deleteCollege,
  viewCollege,
  locBasedCollege
};
