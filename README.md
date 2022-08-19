# Retool take-home notes

### Requirements

- [x] We should have a list of buttons that create components (buttons, inputs, dropdowns, and tables). This is already done for you in the starter application.
- [x] When a user clicks one of the button, a component should appear somewhere on the canvas.
- [x] The user should be able to drag components around the canvas. (In the real Retool, other components will move out of the way to make room for the component, but you don’t need to do this for your version.)
- [x] The canvas should have a fixed grid (e.g. 25x25 pixels per tile), and components should snap onto these grid locations on the canvas (In Retool, our grid is 12 columns and dynamically sized, but you don’t need to do this for your version).
  - [x] Adding a grid visual guide is a plus! (In Retool, we display a grid through pukka dots while the user is dragging).
- [x] The positions of the components should be remembered across the page refreshes. (What’s the easiest way to store data on a browser?)
- [x] Make the components draggable within the canvas only.

### Extra credits

- [x] Create a draggable tooltip that displays when the enclosed component is hovered/focused/active.
- [x] Dragging components to the bottom of the canvas should automatically extend the canvas’s height.
- [x] The components are horizontally limited by the fixed width of the canvas.
- [x] Resize the screen should also resize the components.
- [x] What would it look like to select a component and then edit certain “properties” like the text, border radius, options, etc?

### Hints/Tips

- You can use any drag and drop library you want, but we think the `react-draggable` is the easiest library to use.
- Ideally, you’ll use something like `redux` to store the positions of the components, but the exact implementation is up to you!
- It doesn’t have to look pixel perfect with amazing animations, but we do care a lot about UX and usability at Retool.
  - Paying attention to details like padding, alignment, and cursors are appreciated!
  - Ideally your components would fit the grid, to make layout easy for your user.
  - Pick any UI toolkit (Bootstrap, Material, etc.), but try to make everything look consistent.
  - Handle the UX edge-cases! For example, what happens when a user resizes the screen to be smaller? Ideally a user would still be able to access all the components they placed.
- Even though we’re only asking you to build a few different possible draggable components, how can we structure it so that it’s easy to add a new component?
- Feel free to put whatever data in the table you want. It’s just a placeholder. In the real retool, the data is based on dynamic queries.
- You can check out Retool at [https://login.tryretool.com/auth/signup](https://login.tryretool.com/auth/signup) to see how Retool’s drag and drop works.

### Bonus

- How could it be adapted to also allow users to resize components?

### Draft

- What’s the reason we chose local storage to save a component’s (x, y) position?
  Answer: We have 3 options to save components’ (x, y) positions:
  - cookies.
  - local storage.
  - session storage.
  For session storage, data will be deleted after a session (for example, when users close their browser) ⇒ they won’t be able to see the data once they open the browser again ⇒ we discard this option.
  Compare between using cookies and local storage:
  Both conserve data after users open a new tab or close their browser windows. Since we only save the components’ (x, y) positions, which will only be helpful for the client (Assuming that the server only handles data like components’ names, queries, data fetched from our database, .etc), sending data in each HTTP header (through browser cookies) wastes our bandwidth (as explained in this post: [https://stackoverflow.com/questions/3220660/local-storage-vs-cookies](https://stackoverflow.com/questions/3220660/local-storage-vs-cookies)). Moreover, cookies’ 4KB size limits the number of components’ positions we can save on each page (in comparison to 5MB size of localStorage per domain).
  ⇒ Thus, we used local storage to save our components’ (x, y) positions.
  Resource referenced: [https://javascript.plainenglish.io/3-ways-to-store-data-in-the-browser-db11c412104b](https://javascript.plainenglish.io/3-ways-to-store-data-in-the-browser-db11c412104b)

### Known Issues

- While components align vertically, they don’t perfectly align horizontally. This issue is caused because new components are added at random y positions (they are all added at `x: 0` position, so they align vertically). This should be fixed by a function that returns a new pair of position `(x, y)` available that we can place a new component at on the canvas.
- The polka-dot visual guide don’t correctly represent our grid yet.
- Resize the screen width should also resize the position of the component dynamically.
- Components’ y position may be scooted to the top of the screen when intersects with other components.
- The resizing components functionality has yet to be implemented.
