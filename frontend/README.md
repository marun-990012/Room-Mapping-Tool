Room Mapping Tool – Frontend

The frontend of the Room Mapping Tool is built with React, Leaflet, and Leaflet Draw. It provides an interactive UI where users can upload floor plans, draw room boundaries, and manage room data securely using JWT authentication.


Features

-> User Authentication

1 Login & Register using JWT authentication.

2 Secure access to user-specific floor plans.



-> Upload / Select Floor Plan

1 Upload a floor plan image directly to Cloudinary.

2 Assign a plan name for better identification.

3 View your previously uploaded floor plans.


-> Draw Rooms

1 Mark rooms using polygons or rectangles on the uploaded floor plan.

2 Prompt users to enter a room name after drawing.

-> Room Labels

1 Display labels overlayed on the image showing room names.

-> Manage Rooms

1 View saved rooms for each floor plan.

2 Edit or delete room names and shapes easily.

3 Leaflet + Leaflet Draw

4 Provides smooth drawing and editing tools for room mapping.


-> Tech Stack

1 Framework: React.js

2 Styling: Tailwind CSS

3 Mapping: Leaflet + Leaflet Draw

4 API Integration: Axios

5 Authentication: JWT

6 Image Uploads: Cloudinary

7 Deployment: Vercel