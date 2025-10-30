import Building from "../../models/master/Building.js";

const getBuilding = async (req, res) => {
  try {
    const buildingData = await Building.find();
    res.status(200).json({ buildingData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const storeBuilding = async (req, res) => {
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

const getBuildingEdit = async (req, res) => {
  try {
    const editBuilding = await Building.findById(req.params.id);
    console.log(editBuilding);
    if (!editBuilding) {
      return res.status(404).json({ message: "Building No Found" });
    }
    return res.status(200).json({ editBuilding });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const updateBuilding = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, location, building } = req.body;

    if (!location) {
      return res.status(400).json({ message: "Location is Required" });
    }
    if (!college) {
      return res.status(400).json({ message: "Building is Required" });
    }

    await Building.findByIdAndUpdate(_id, {
      location_id: location,
      college: college,
    });
    return res.status(201).json({ message: "Building is Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const deleteBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    await Building.delete({ _id: id });
    res.status(200).json({ message: "Building is Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const viewBuilding = async (req, res) => {
  try {
    const buildingView = await College.findById(req.params.id);
    if (!buildingView) {
      res.status(400).json({ message: "College Not Found" });
    }
    res.status(200).json({ buildingView });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const buildingMasterController = { getBuilding, storeBuilding, getBuildingEdit, updateBuilding, deleteBuilding, viewBuilding};
