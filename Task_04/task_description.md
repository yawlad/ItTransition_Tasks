# Task 4

## Task Description

Implement a web application that allows users to register and authenticate. Non-authenticated users should have access only to registration and authentication forms.

Authenticated users can view a table of "users" with the following fields:
- Identifier
- Name
- Email
- Registration Date
- Last Login Date
- Status

In the leftmost column of the table, there should be checkboxes for multiple selection, and in the column header, there should be only a checkbox without text, allowing users to select or deselect all records. Above the table, there should be a toolbar with actions: "Block," "Unblock," "Delete" (the last two actions can be represented as icons). Multiple selection, checkboxes, and the toolbar are mandatory. It is recommended to use a CSS framework, such as Bootstrap, for styling, but you can choose any other.

Users can delete or block their own accounts, and they should be logged out immediately. If someone else blocks or deletes a user's account, the user should be redirected to the login page upon any subsequent requests.

During registration, users should be able to use any password, even one consisting of a single character.

Blocked users cannot log in, but deleted users can register again.

This application should be implemented using the following technologies:
- Frontend: TypeScript, Next.js, tailwind.css
- Backend: Python, Django, MySQL