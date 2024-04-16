import express from "express";
const router = express.Router();
import Family from "../models/familyModel.js";

// Add family information
router.post("/family", async (req, res) => {
  try {
    const familyData = req.body;
    console.log(familyData);
    const newFamily = new Family(familyData);
    await newFamily.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Family information added successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to add family information",
        error: error.message,
      });
  }
});

router.get("/heads", async (req, res) => {
  try {
    const allFamilies = await Family.find();
    const headsWithCount = [];
    allFamilies.forEach(family => {
      const headId = family._id; // Assuming _id is the unique identifier
      const headName = family.headOfFamily.name;
      const familyCount = family.familyMembers.length;
      headsWithCount.push({ headId: headId, headName: headName, familyCount: familyCount });
    });
    res.json(headsWithCount);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch family heads", error: error.message });
  }
});


// Get family details by ID
router.get('/family/:headId', async (req, res) => {
  try {
    const { headId } = req.params;
    const family = await Family.findById(headId);
    if (!family) {
      return res.status(404).json({ success: false, message: 'Family not found' });
    }
    res.json({ success: true, family });
  } catch (error) {
    console.error('Error fetching family details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch family details', error: error.message });
  }
});

export default router;
