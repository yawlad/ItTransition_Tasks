# Task 6

## Description

**Backend**: Node.js with Express.js
**Frontend**: Next.js

Create a web application for "collaborative drawing" with open access, using Google Jamboard as an example.

No registration or authentication is required. All users have immediate access to a list of "boards" (users simply enter a random name when logging in).

Each user can create a "board" or join an existing one.

Multiple users can draw on the same "board" simultaneously. When someone draws something, it appears to other users "instantly" (there may be a slight delay, achieved through polling or using websockets).

Everything drawn on the "board" is saved "forever" (if a user joins the board later, they can see everything created earlier).

The drawing area should fill the window entirely (except for the tools panel) and should scale/scroll appropriately.

Optional Requirements (each one will enhance the evaluation):
* Ability to erase previously drawn elements.
* Multiple drawing tools (e.g., "text," "rectangle," "circle") with color options.
* Thumbnails for board previews in the list of "boards."
* Option to export the drawing as JPEG.
