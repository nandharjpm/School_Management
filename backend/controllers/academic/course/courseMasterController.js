import Course from "../../../models/academic/course/Course.js"

const getCourse = async (req, res) => {
  try {
    const courseData = await Course.find();
    res.status(200).json({ courseData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const storeCourse = async (req, res) => {
  try {    
    const { college, location, department, courses, year } = req.body;
    

    if (!location) {
      return res.status(400).json({ message: "Location is Required" });
    }

    if (!college) {
      return res.status(400).json({ message: "College is Required" });
    }

    if (!year) {
      return res.status(400).json({ message: "Year is Required" });
    }

    if (!courses || courses.length == 0) {
      return res.status(400).json({ message: "Course is Required" });
    }

    const saveCourse = new Course({ location_id: location, college_id:college, department_id:department, year, course:courses});

    await saveCourse.save();
    return res.status(201).json({ message: "Course is Created Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCourseEdit = async (req, res) => {
  try {
    const editCourse = await Course.findById(req.params.id);    
    if (!editCourse) {
      return res.status(404).json({ message: "Course No Found" });
    }
    return res.status(200).json({ editCourse });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const updateCourse = async (req, res) => {
  try {
    
    const { _id, location, college, building } = req.body;

    if (!location) {
      return res.status(400).json({ message: "Location is Required" });
    }
    if (!college) {
      return res.status(400).json({ message: "Course is Required" });
    }

    await Course.findByIdAndUpdate(_id, { location_id: location, college_id: college, building});
    return res.status(201).json({ message: "Course is Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.delete({ _id: id });
    res.status(200).json({ message: "Course is Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const viewCourse = async (req, res) => {
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

export const courseMasterController = { getCourse, storeCourse, getCourseEdit, updateCourse, deleteCourse, viewCourse};
