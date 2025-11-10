import Department from "../../models/master/Department.js";

const getDepartment = async (req, res) => {
  try {
    const department_list = await Department.find();
    res.status(200).json({ department_list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const storeDepartment = async (req, res) => {
  try {
    const { college, location, department } = req.body;
    const existingDepartment = await Department.findOne({ college, location, department });
    

    if (!location) {
      return res.status(400).json({ message: "Location is Required" });
    }

    if (!college) {
      return res.status(400).json({ message: "College is Required" });
    }

    if(existingDepartment){
        return res.status(400).json({message:"Department is Alredy Exist"});
    }

    const saveDepartment = new Department({ location_id: location, college_id:college, department});

    await saveDepartment.save();
    return res.status(201).json({ message: "Department is Created Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getDepartmentEdit = async (req, res) => {
  try {
    const editDepartment = await Department.findById(req.params.id);
    console.log(editDepartment);
    if (!editDepartment) {
      return res.status(404).json({ message: "Department No Found" });
    }
    return res.status(200).json({ editDepartment });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const updateDepartment = async (req, res) => {
  try {
      const { _id, location, college, department } = req.body;
      console.log("details : ", req.body);

    if (!location) {
      return res.status(400).json({ message: "Location is Required" });
    }
    if (!college) {
      return res.status(400).json({ message: "College is Required" });
    }
    if(!department){
        return res.status(400).json({message:"Department is Required"});
    }

    await Department.findByIdAndUpdate(_id, {
      location_id: location,
      college_id: college,
      department
    });
    return res.status(201).json({ message: "Department is Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.delete({ _id: id });
    res.status(200).json({ message: "Location Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const viewDepartment = async (req, res) => {
  try {
    const collegeView = await Department.findById(req.params.id);
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
    const getCollege = await Department.find({location_id: locationId});    
    console.log(getCollege);
    
    if(!getCollege){
      return res.status(404).json({message:"College Not Found"});
    }
    return res.status(200).json({getCollege});
  }catch(err){
    return res.status(500).json({message:err});
  }
}

export const departmentMasterController = {
  getDepartment,
  storeDepartment,
  getDepartmentEdit,
  updateDepartment,
  deleteDepartment,
  viewDepartment,
  locBasedCollege
};
