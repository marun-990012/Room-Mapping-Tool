

# Room Mapping Tool 
 ## Backend

The backend of the Room Mapping Tool is built with Node.js, Express, MongoDB, and Cloudinary. It provides JWT-secured APIs to manage users, floor plans, and room data.

## Features

### -> User Authentication

1 JWT-based login and registration.

2 Protects floor plans and room data per user.



### -> Floor Plan Management

1 Upload floor plan images to Cloudinary.

2 Save and manage plan names for easy identification.



###  -> Room Management APIs

1 Save room details including name, coordinates, and image reference.

2 Fetch all rooms for a given floor plan.

3 Edit or delete rooms easily.



### ->Tech Stack

1 Runtime: Node.js

2 Framework: Express.js

3 Database: MongoDB (Mongoose ODM)

4 Authentication: JWT

5 Image Uploads: Cloudinary

6 Deployment: Render






# Frontend

The frontend of the Room Mapping Tool is built with React, Leaflet, and Leaflet Draw. It provides an interactive UI where users can upload floor plans, draw room boundaries, and manage room data securely using JWT authentication.


## Features

### -> User Authentication

1 Login & Register using JWT authentication.

2 Secure access to user-specific floor plans.



### -> Upload / Select Floor Plan

1 Upload a floor plan image directly to Cloudinary.

2 Assign a plan name for better identification.

3 View your previously uploaded floor plans.


### -> Draw Rooms

1 Mark rooms using polygons or rectangles on the uploaded floor plan.

2 Prompt users to enter a room name after drawing.

### -> Room Labels

1 Display labels overlayed on the image showing room names.

### -> Manage Rooms

1 View saved rooms for each floor plan.

2 Edit or delete room names and shapes easily.

3 Leaflet + Leaflet Draw

4 Provides smooth drawing and editing tools for room mapping.


### -> Tech Stack

1 Framework: React.js

2 Styling: Tailwind CSS

3 Mapping: Leaflet + Leaflet Draw

4 API Integration: Axios

5 Authentication: JWT

6 Image Uploads: Cloudinary

7 Deployment: Vercel