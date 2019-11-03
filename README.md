# team 53
To initally run the app, please run `npm install` to install dependencies, then `npm start` to start the server.
http://localhost:3000/ should open in your browser.

DoleOut: A web application that allows groups of people to track shared expenses.

Admins are differentiated from users in that they have the ability to rename and delete groups, delete group members, and delete chats and expenses from a group's timeline.

These admin privileges are marked in bold throughout the document.

Note: it is assumed that no user is logged in on the home page, the registration page, or the login page.

_____________________

## REGISTRATION 

The Register tab takes you to a form where you can create a new user.
It does not allow you to create a user if the given username already exists or is empty, your given password has less than seven characters, or your password confirmation does not match.

If all the given fields are valid, the register button takes you to the profile page of "user", which is a temporary measure.
In the future, we intend a successful registration to take you to your own new profile page.
At the moment, registration does not actually have any back-end functionality without server calls.
_____________________

## LOGIN

The Login tab takes you to a form where you can login to an existing user's account.
The following credentials are accepted currently:
    Username: user, Password: user
    Username: admin, Password: admin

Upon successful login, you are taken to the groups page, which differs in functionality depending on whether you log in as an admin or not.
_____________________

## PROFILE 

We intend for this page to  be accessible using the "Profile" button in the site header, but that is currently hard-coded to link to the profile page of "user".

This page is otherwise accessible by clicking a user within a group.

This page displays various user information, including username, full name, description, preferred payment method, and email.
On the top right of the page is an edit button, which allows you to edit any of these fields.
Without server calls, any changed information is reset to default upon reloading the page.
_____________________

## GROUPS PAGE

This is accessible through the Groups button in the website header.
It currently contains various dummy groups, each with a name, icon, member list, and color.

**Admins are able to edit a group's name, or delete the group entirely** (without server calls, any changed information or deleted groups are reset upon reloading the page). Users are unable to see these options presented.

At the bottom of the page, clicking on the green plus sign will pop up a form to create a new group.
Clicking on any of the already-created groups brings you to its individual group page, which are all currently hard-coded.
Without server calls, clicking on any newly created groups currently brings you to our 404 page.

The creation of a new group entails picking its title, group members, color, and icon.
Upon creating the group, the group is added to the Groups Page.
Without server calls, any newly created groups are erased upon reloading the page.
_____________________

## GROUP PAGE

Each individual group page is accessible through clicking one of the groups in the Groups tab.
Each group page consists of three columns:
1. The group members column
    Here is a list of all the members of a group.
    Clicking a member brings you to that member's individual (hard-coded) profile page.
    At the bottom of the list is a green plus, which allows you to add new members to the group by inputting their username.
    Note that adding members only adds the element to the page without any back-end functionality.
    Newly added members cannot be added to new expenses until server functionality is implemented in Phase 2.
    Only existing users (in our hard-coded master user list) can be added to groups.
    **Admins are able to remove members of the group.** Users are unable to see the remove buttons.
    Note that removing members only removes the element from the page without any back-end functionality.
2. The group messages timeline
    Here you can see a chronological list of sent messages to the group.
    A message can either be a text chat or a created expense, with each message having the user who sent the message and the time it was sent.
    At the top corner of the timeline is a button that allows you to create new expenses.
    Expenses are more thoroughly covered later on.
    **Admins are able to delete chats and expenses entirely.** Users are unable to see the deletion buttons.
    Without server calls, the page resets to our default hard-coded data on reload.
3. The current expenses and other groups column
    Here short blocks of information about each of the group's expenses are displayed, namely the creator of the expense and the expense's remaining debt.
    Below this are links to the other groups of the site.

_____________________

## EXPENSES

Through the New Expense button in the group timeline, a form will pop up to create a new expense.
You must input the expense's title, content (a description of the expense or whatever text information you wish to include), the total cost of the expense, and the members of the expense.
Members can only be added if they are within the group that the expense is created in.

The creator of the expense is automatically added as a member of the expense, and his or her share of the expense's total cost is deducted from the remaining cost.
Currently the cost of an expense is assumed to be divided evenly among all the expense members.

Upon creating the expense, the expense is displayed on the group timeline, showing its title, content, total cost, remaining cost, and how much the user has left to pay if applicable.

Below this information are the profile pictures of the members of the expense.
If a picture is greyed-out, that indicates that that member has paid their portion of the expense.
(Note, the creator of the expense has his or her picture greyed out automatically as their portion is assumed to already have been paid for upon creation of the expense)

Beside the member pictures is a pay button, which is clickable if the current user is a member of that expense and has not already paid their full share.
Upon clicking this pay button, the user is prompted how much he or she would like to pay. A user is not able to pay less than $0.01 or more than their even split of the expense's cost.
Upon inputting a valid amount to pay, that amount is deducted from the expense's remaining total, and the user's picture may be greyed out (depending if he or she paid the totality of their portion). 
Once the expense has been fully paid, the entire expense message in the timeline is greyed out and removed from the expense sidebar.

As before, any changes to expenses are reset upon reloading the page without server calls.

_____________________
