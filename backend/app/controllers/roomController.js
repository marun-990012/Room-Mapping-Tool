import Room from "../models/RoomModel.js";
const roomController = {};

roomController.create = async (req, res) => {
    const {planName, floorPlan, roomName, coordinates, shapeTypes } = req.body;
    // console.log(floorPlan.length)
  try {
    const room = new Room({planName, floorPlan, roomName, coordinates, shapeTypes, userId:req.userId });
    await room.save();
    return res.json({result:room,success:true});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong with server', success:false });
  }
};


// // get rooms for a floor plan
roomController.fetch = async (req, res) => {
  try {
    
    const roomPlans = await Room.find({userId:req.userId});
    return res.status(200).json({result:roomPlans,success:true});
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong with server', success:false });
  }
}


roomController.detail = async (req, res) => {
  const {id} = req.params;

  try {
    const roomPlan = await Room.findOne({_id:id,userId:req.userId});
    return res.status(200).json({result:roomPlan,success:true});
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong with server', success:false });
  }
}

// update room plan
roomController.update = async (req, res) => {
  // console.log(req.params.id)
  try {
    const update = req.body;
    const updated = await Room.findByIdAndUpdate(req.params.id, update, { new: true });
    return res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong with server', success:false });
  }
};

// delete room
roomController.delete = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong with server', success:false });
  }
}


//delete plan (all rooms)
roomController.deletePlan = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    const result = await Room.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} plans deleted successfully`
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export default roomController;