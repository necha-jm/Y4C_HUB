# Implementation Plan - Static Landing Page and Dashboard Link

This plan aims to make the current main page a static landing page accessible at the root path (`/`) and provide a clear way for authenticated users to access their dashboard via a specific route (`/dashboard`).

## User Review Required

> [!IMPORTANT]
> The dashboard will no longer replace the landing page automatically upon login. Users will need to click a "Dashboard" button in the header or navigate directly to `/dashboard`.

## Proposed Changes

### Core Routing

#### [MODIFY] [App.jsx](file:///home/kali/Y4CWeb/src/App.jsx)
- Separate the landing page (`MainLayout`) and the `Dashboard` into explicit routes.
- Define `/dashboard` as a protected route.
- Update `handleLogin` to redirect or simply update state, and ensure the UI reflects the authenticated state.

### UI Components

#### [MODIFY] [Header.jsx](file:///home/kali/Y4CWeb/src/components/Header.jsx)
- Accept `isAuthenticated` prop.
- Replace the "Login" button with a "Dashboard" button (linking to `/dashboard`) if the user is logged in.
- Ensure the logo and "Home" link work correctly across routes.

#### [MODIFY] [Login.jsx](file:///home/kali/Y4CWeb/src/components/Login.jsx)
- Ensure that after a successful login, the user is navigated to the dashboard.

## Verification Plan

### Manual Verification
1.  **Landing Page:** Visit `/` and verify the static landing page is visible.
2.  **Login:** Click "Login", enter credentials, and verify redirection to `/dashboard`.
3.  **Dashboard Navigation:** While logged in, go back to `/` and verify the Header shows a "Dashboard" button. Click it to return to the dashboard.
4.  **Direct Access:** Verify that accessing `/dashboard` while logged out redirects or shows the login modal/page (depending on implementation preference, currently it will show Login if `showLogin` is true).
