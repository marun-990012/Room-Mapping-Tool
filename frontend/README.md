Room Mapping Tool – Frontend

The frontend of the Room Mapping Tool is built with React, Leaflet, and Leaflet Draw.
It provides an interactive UI where users can upload floor plans, draw room boundaries, and manage room data securely using JWT authentication.

✨ Features
<small>🔐 User Authentication</small>

Login & Register using JWT authentication.

Secure access to user-specific floor plans.

<small>🖼️ Upload / Select Floor Plan</small>

Upload a floor plan image directly to Cloudinary.

Assign a plan name for better identification.

View your previously uploaded floor plans.

<small>📐 Draw Rooms</small>

Mark rooms using polygons or rectangles on the uploaded floor plan.

Prompt users to enter a room name after drawing.

<small>🏷️ Room Labels</small>

Display labels overlayed on the image showing room names.

<small>🛠️ Manage Rooms</small>

View saved rooms for each floor plan.

Edit or delete room names and shapes easily.

<small>🗺️ Leaflet + Leaflet Draw</small>

Provides smooth drawing and editing tools for room mapping.

🛠 Tech Stack

Framework: React.js

Styling: Tailwind CSS

Mapping: Leaflet + Leaflet Draw

State Management: Redux Toolkit

API Integration: Axios

Authentication: JWT

Image Uploads: Cloudinary

Deployment: Vercel