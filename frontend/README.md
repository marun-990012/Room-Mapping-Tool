Room Mapping Tool – Frontend

The frontend of the Room Mapping Tool is built with React, Leaflet, and Leaflet Draw. It provides an interactive UI where users can upload floor plans, draw room boundaries, and manage room data securely using JWT authentication.


Features

User Authentication

Login & Register using JWT authentication.

Secure access to user-specific floor plans.

Upload / Select Floor Plan

Upload a floor plan image directly to Cloudinary.

Assign a plan name for better identification.

View your previously uploaded floor plans.

Draw Rooms

Mark rooms using polygons or rectangles on the uploaded floor plan.

Prompt users to enter a room name after drawing.

Room Labels

Display labels overlayed on the image showing room names.

Manage Rooms

View saved rooms for each floor plan.

Edit or delete room names and shapes easily.

Leaflet + Leaflet Draw

Provides smooth drawing and editing tools for room mapping.


Tech Stack

Framework: React.js

Styling: Tailwind CSS

Mapping: Leaflet + Leaflet Draw

State Management: Redux Toolkit

API Integration: Axios

Authentication: JWT

Image Uploads: Cloudinary

Deployment: Vercel