# Expert Management System Walkthrough

I have implemented a dynamic Expert Management System that allows Coordinators to manage team members and display them in a hierarchical structure on the "Our Team" page.

## Changes Made

### Backend
- **[NEW] [Expert.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/model/Expert.java)**: Data model for experts, including fields for hierarchy (`parentId`) and profile pictures.
- **[NEW] [ExpertRepository.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/repository/ExpertRepository.java)**: JPA repository for handling expert data persistence.
- **[NEW] [ExpertService.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/service/ExpertService.java)**: Business logic for managing expert records.
- **[MODIFIED] [CoordinatorController.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/controller/CoordinatorController.java)**: Added CRUD endpoints for coordinators to manage experts.
- **[MODIFIED] [PublicController.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/controller/PublicController.java)**: Added a public endpoint for the "Our Team" page to fetch expert data.

### Frontend
- **[NEW] [ExpertManager.jsx](file:///home/kali/Y4CWeb/src/components/dashboards/moderator/ExpertManager.jsx)**: A comprehensive management interface for the Coordinator dashboard. Features:
    - List, add, edit, and delete experts.
    - Profile picture upload functionality.
    - Hierarchy selection (ability to choose a parent expert).
    - Display order management.
- **[MODIFIED] [CoordinatorDashboard.jsx](file:///home/kali/Y4CWeb/src/components/dashboards/CoordinatorDashboard.jsx)**: Added an "Experts" tab to the dashboard navigation.
- **[MODIFIED] [OurTeam.jsx](file:///home/kali/Y4CWeb/src/pages/OurTeam.jsx)**: Replaced hardcoded team data with a dynamic fetching mechanism that reconstructs the hierarchical team tree from the backend data.

## Verification Results

### Backend Logic
- The `Expert` entity and repository are configured to support parent-child relationships, allowing for complex organizational charts.
- The `ExpertService` handles updates and deletions correctly.

### Frontend Logic
- The `ExpertManager` uses the project's standard `apiClient` and `FileController` for uploads.
- The `OurTeam` page uses a recursive rendering strategy to maintain the visual hierarchy defined in the dashboard.
