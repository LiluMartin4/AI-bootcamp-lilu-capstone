# UI Guidelines

## Purpose
Define the core HUD customization experience so players can quickly personalize readability and visual style while playing.

## Core Requirements
- A gear icon must appear at the top area of the UI and open HUD customization settings.
- HUD settings must allow users to choose visual themes using preset color buttons.
- Each preset button uses the preset's main color as the button fill for quick recognition.
- The system must include exactly 10 premade color presets plus 1 color blind mode preset.
- Users must be able to adjust font size with a scale control that supports increase and decrease.

## Settings Entry Point
- Place a gear icon in the top header/navigation bar.
- Gear icon should be visible on desktop and mobile layouts.
- Clicking or tapping the gear icon opens a settings panel or drawer.
- Settings panel can be closed by:
1. Clicking a close button.
2. Pressing Escape.
3. Clicking outside the panel.

## HUD Theme Presets
Each preset defines:
- Background color.
- Paired accent color.
- Text color.

Preset behavior:
- Display all presets as clickable swatches/buttons.
- Show 10 standard presets and 1 color blind mode option.
- Use the preset's main color for the visible button background.
- Indicate selected preset with a strong active state (border, check mark, or glow).
- Apply selected preset immediately to the HUD preview and active game UI.

## Required Preset List
Create and ship at least these 11 preset options:
1. Forge Ember (standard)
2. Deep Forest (standard)
3. Lake Mist (standard)
4. Royal Hall (standard)
5. Midnight Steel (standard)
6. Sandstone (standard)
7. Stormglass (standard)
8. Moss and Copper (standard)
9. Ash and Gold (standard)
10. Dawn Bloom (standard)
11. Color Blind Mode (accessible)

## Color Blind Mode Requirements
- Must be clearly labeled as Color Blind Mode.
- Must prioritize high contrast for text and critical HUD indicators.
- Must avoid color pairs commonly confused in red-green deficiencies.
- Must remain readable in all HUD states (default, warning, success, alert).
- Should include non-color cues where possible (icons, underlines, patterns, labels).

## Font Size Control
- Add a labeled scale/slider next to or within the same settings panel as the color presets.
- Label example: Font Size.
- Scale must support both decreasing and increasing text size.
- Recommended range: 85 percent to 140 percent.
- Recommended step: 5 percent.
- Apply changes live while sliding.
- Provide a visible current value (for example, 100 percent).
- Include a reset-to-default action.

## Accessibility and UX Rules
- All controls must be keyboard accessible.
- Gear button, preset buttons, and slider must have visible focus states.
- Provide ARIA labels for icon-only controls like the gear button.
- Maintain contrast ratios suitable for readability.
- Do not rely on color alone to communicate selected states.
- Persist user HUD selections between sessions when possible.

## Responsive Behavior
- On desktop: settings can open as a side panel.
- On small screens: settings can open as a bottom sheet or full-screen modal.
- Preset buttons should wrap gracefully and remain tappable.
- Font slider should remain usable on touch devices.

## Default State
- Default preset should load on first launch.
- Default font scale should be 100 percent.
- If saved preferences exist, load saved preset and font scale on startup.

## QA Acceptance Criteria
- Gear icon is present and opens settings reliably.
- Exactly 10 standard presets are selectable.
- Color Blind Mode is selectable and visibly distinct.
- Selecting any preset updates background, accent, and text colors.
- Font scale changes are reflected immediately in HUD text.
- Font scale supports increase and decrease within configured bounds.
- Keyboard and screen-reader navigation work for all settings controls.
