Room Mapping Tool – Backend

The backend of the Room Mapping Tool is built with Node.js, Express, MongoDB, and Cloudinary. It provides JWT-secured APIs to manage users, floor plans, and room data.

Features

-> User Authentication
1 JWT-based login and registration.
2 Protects floor plans and room data per user.

-> Floor Plan Management
1 Upload floor plan images to Cloudinary.
2 Save and manage plan names for easy identification.

-> Room Management APIs
1 Save room details including name, coordinates, and image reference.
2 Fetch all rooms for a given floor plan.
3 Edit or delete rooms easily.

->Tech Stack
1 Runtime: Node.js
2 Framework: Express.js
3 Database: MongoDB (Mongoose ODM)
4 Authentication: JWT
5 Image Uploads: Cloudinary
6 Deployment: Render