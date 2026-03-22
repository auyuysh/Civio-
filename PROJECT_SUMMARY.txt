PROJECT OVERVIEW: POLLUTION MANAGEMENT SYSTEM (Civio)
======================================================

A web-based pollution complaint management system that enables citizens to submit,
track, and manage pollution-related complaints in their city.


PROJECT STRUCTURE
-----------------
- /frontend        - React + Vite frontend application
- /backend         - Django REST API backend
- /node_modules    - Shared dependencies
- /env             - Environment configurations


FRONTEND (React + Vite)
-------------------------
Tech Stack:
- React 18.3.1
- Vite (build tool)
- React Router DOM 7.13.1
- ESLint for code linting

Features Implemented:
1. Authentication System
   - Login/Register modal with form validation
   - JWT token storage in localStorage
   - User session management with automatic token refresh
   - Logout functionality

2. TopBar Navigation
   - Dynamic login/register buttons
   - User profile display when authenticated
   - Real-time authentication state updates

3. Dashboard (Home Page)
   - Fixed sidebar navigation menu
   - My Complaints section with status filtering
   - Responsive card-based complaint display
   - Status badges (Pending, In Progress, Resolved)
   - Location display for each complaint
   - "New Complaint" button (UI ready)
   - Loading and error state handling

4. UI Components
   - Responsive design with CSS custom properties
   - Gradient backgrounds and shadows
   - Smooth transitions and hover effects
   - Mobile-friendly layouts with media queries


BACKEND (Django REST Framework)
---------------------------------
Tech Stack:
- Django 6.0.3
- Django REST Framework
- SimpleJWT for authentication
- SQLite database
- CORS headers for cross-origin requests

Features Implemented:

1. Authentication API (/api/auth/)
   - POST /api/auth/register/ - User registration
   - POST /api/auth/login/ - User login with JWT token generation
   - JWT access and refresh tokens
   - Protected endpoints using @permission_classes

2. Complaints API (/api/complaints/)
   - POST /api/complaints/create/ - Submit new complaint (authenticated)
   - GET /api/complaints/my/ - Get user's complaints (authenticated)

3. Database Models:

   a) MunicipalCommittee
      - name, state, city, address

   b) Complaint
      - User relation (ForeignKey)
      - Title, description, image (upload support)
      - Location: state, city, pincode, address
      - Committee assignment (ForeignKey)
      - Status tracking: submitted, approved, in_progress, resolved
      - Estimated resolution time
      - Auto timestamp (created_at)

   c) ComplaintUpdate
      - Tracks status changes over time
      - ForeignKey to Complaint

4. Security Features:
   - Password validation
   - JWT token authentication
   - CORS configuration
   - Session-based auth middleware

5. Admin Panel:
   - Django admin interface for managing complaints
   - Model registration in admin.py


KEY TECHNOLOGIES & CONCEPTS USED
---------------------------------

React:
- Functional components with hooks (useState, useEffect)
- Conditional rendering
- Event handling
- CSS modules/styled components via CSS files
- Local state management
- API integration with fetch()
- Responsive design with media queries

Django:
- Django Models with Relationships (ForeignKey)
- Django REST Framework serializers
- API views with decorators (@api_view, @permission_classes)
- JWT authentication (SimpleJWT)
- CORS handling
- Django ORM for database queries
- URL routing with path()
- Admin interface customization


HOW TO RUN
----------
Backend:
  cd backend
  python manage.py runserver  (runs on http://127.0.0.1:8000)

Frontend:
  cd frontend
  npm run dev  (runs on http://localhost:5173)


FUTURE ENHANCEMENTS (Planned)
-----------------------------
- New Complaint form with image upload
- Community discussion section
- Government events calendar
- Awareness content section
- Support/help center
- Complaint tracking with detailed timeline
- Admin dashboard for municipal committees
- Email notifications
- Mobile app version
