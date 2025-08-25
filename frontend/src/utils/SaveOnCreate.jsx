import axios from "axios";
import { coordsFromLayer } from "../helpers/helper";
export async function saveRoom({ layer, layerType, floorPlan, roomName,planName }) {
  const coordinates = coordsFromLayer(layer);

  const payload = {
    planName,
    floorPlan,     // full URL now
    roomName,
    coordinates,
    shapeTypes: layerType,
  };

  console.log("Saving Room Payload:", payload);

  const res = await axios.post("http://localhost:3323/api/room/create",payload,{headers:{Authorization:localStorage.getItem('token')}});
//   console.log(res.data)
  localStorage.setItem("room",res.data.result._id);
  return res.data;
}
