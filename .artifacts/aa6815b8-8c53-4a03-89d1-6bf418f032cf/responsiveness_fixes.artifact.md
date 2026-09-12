# Responsiveness Fixes

To ensure the UI is not affected by device screen size, the following adjustments are being made:

## Global Styles
- Adjusted section title font sizes from hardcoded large values (e.g., `text-5xl lg:text-7xl`) to more responsive ranges (e.g., `text-3xl md:text-5xl lg:text-7xl`).

## Layout Adjustments
- **Hero Section**: Refined padding to avoid overlap with the fixed header while remaining centered on different aspect ratios.
- **Dashboards**: Reduced excessive padding on mobile screens and ensured grid systems wrap correctly.
- **Header**: Ensured logos and navigation have appropriate scaling and don't overflow on smaller viewports.

## Specific Component Changes
- `About.jsx`: Title sizing.
- `Programs.jsx`: Title sizing and grid spacing.
- `Impact.jsx`: Metric grid responsiveness.
- `Events.jsx`: Card layout on small screens.
- `Startups.jsx`: Story grid stacking.
- `MemberDashboard.jsx`: Overall page padding and card wrapping.
