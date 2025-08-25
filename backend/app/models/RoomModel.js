import mongoose from 'mongoose';

const {Schema,model} = mongoose;
const RoomPlanSchema = new Schema({
  planName:{
    type: String
  },
  userId:{
    type:Schema.Types.ObjectId
  },

  floorPlan: { 
    type: String, 
    
  },

  roomName: { 
    type: String, 
    required: true 
  },

  coordinates: { 
    type: Array, 
    required: true 
  }, // store geojson coordinates

  shapeTypes: {
     type: String, 
     enum: ['polygon', 'rectangle'], 
     default: 'polygon' 
 },

},{timestamps:true});

const Room = model('Room', RoomPlanSchema)

export default Room;
