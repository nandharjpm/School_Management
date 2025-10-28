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

export const collegeMasterController = {
  getCollege,
  storeCollege,
};
