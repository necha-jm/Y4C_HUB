# Expert Management System Implementation Plan

This plan outlines the steps to implement an Expert management system where Coordinators can register experts, upload their profile pictures, and have them dynamically displayed on the "Our Team" page.

## User Review Required

> [!IMPORTANT]
> The "Our Team" page currently uses a specific tree-like hierarchical layout. The proposed dynamic implementation will aim to reconstruct this hierarchy based on a `parentId` field, but may default to a structured grid if the complexity of the tree exceeds standard mapping.

## Proposed Changes

### [Backend Components]

We will introduce a new `Expert` entity and corresponding service/controller layers.

#### [NEW] [Expert.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/model/Expert.java)
- Define fields: `id`, `name`, `title`, `bio`, `profilePicture`, `displayOrder`, `parentId`.

#### [NEW] [ExpertRepository.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/repository/ExpertRepository.java)
- Standard JPA repository for CRUD operations.

#### [NEW] [ExpertService.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/service/ExpertService.java)
- Logic for managing experts and potentially organizing them into a hierarchy for the frontend.

#### [MODIFY] [CoordinatorController.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/controller/CoordinatorController.java)
- Add endpoints:
    - `GET /api/coordinator/experts`: List all experts.
    - `POST /api/coordinator/experts`: Create a new expert.
    - `PUT /api/coordinator/experts/{id}`: Update an expert.
    - `DELETE /api/coordinator/experts/{id}`: Remove an expert.

#### [MODIFY] [PublicController.java](file:///home/kali/Y4CWeb/BACKEND-Y4C/src/main/java/com/y4c/BACKEND_Y4C/controller/PublicController.java)
- Add endpoint: `GET /api/public/experts` to fetch experts for the "Our Team" page.

---

### [Frontend Components]

#### [NEW] [ExpertManager.jsx](file:///home/kali/Y4CWeb/src/components/dashboards/moderator/ExpertManager.jsx)
- A new component for the Coordinator to:
    - List existing experts.
    - Add new experts with a form (Name, Title, Bio, Parent Expert).
    - Upload profile pictures using the existing `FileController` upload endpoint.
    - Edit or Delete experts.

#### [MODIFY] [CoordinatorDashboard.jsx](file:///home/kali/Y4CWeb/src/components/dashboards/CoordinatorDashboard.jsx)
- Add an "Experts" tab in the navigation.
- Wire up the `ExpertManager` component.

#### [MODIFY] [OurTeam.jsx](file:///home/kali/Y4CWeb/src/pages/OurTeam.jsx)
- Replace hardcoded team data with a fetch call to `/api/public/experts`.
- Implement a recursive or iterative rendering logic to maintain the hierarchical "Expert" tree.

## Verification Plan

### Automated Tests
- I will verify the new backend endpoints using `curl` or a shell script to ensure experts can be created, updated, and fetched.
- I will check for any compilation errors in the React frontend.

### Manual Verification
- The user should verify:
    1.  The "Experts" tab appears in the Coordinator dashboard.
    2.  Experts can be added with an image upload.
    3.  The "Our Team" page updates dynamically with the newly added experts.
