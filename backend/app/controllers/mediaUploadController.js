

import cloudinary from "../../config/configurations/cloudinaryConfig.js";

const mediaUploadController = {};
/**
 * This function is used to Upload the image into cloudinary
 * @param { file } - This  function takes images as a aggument upload it into cloudinary
 * @returns - it returns the address of the image stored in cloudinary
*/

/**  Response from cloudinary
          {
           "asset_id": "abcd1234",
           "public_id": "Room-Mapping/1692789155_profile.jpg",
           "version": 1692789155,
           "secure_url": "https://res.cloudinary.com/your-cloud/image/upload/v1692789155/Room-Mapping/profile.jpg"
          }
 */

mediaUploadController.uploadImage = async (req, res) => {
    // console.log('hi');
    // console.log(req.file)
    
    try {
          const file = req.file;

          if (!file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
      
          const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
            folder: 'Room-Mapping',
          });

          // console.log(cloudinaryResponse)

          res.json(cloudinaryResponse.secure_url);
        } catch (err) {
            console.log(err)
          return res.status(500).json({ error: "Failed to upload image", success:false });
        }
}

export default mediaUploadController;