Answer_1:getElementById(id): Selects one element by its unique id; returns single Element (or null); fastest method, limited to IDs only.
getElementsByClassName(className): Selects all elements with given class(es); returns live HTMLCollection (array-like, auto-updates with DOM); supports multiple classes but basic syntax.
querySelector(selector): Selects first matching element using any CSS selector (IDs, classes, tags, attributes, etc.); returns single Element (or null); versatile but slower.
querySelectorAll(selector): Selects all matching elements using full CSS selectors; returns static NodeList (snapshot, doesn't auto-update); most flexible


Answer_2:Here are the main ways to create and insert elements into the DOM:
Creating an element:
javascriptconst newElement = document.createElement('div');
newElement.textContent = 'Hello, World!';
newElement.classList.add('my-class');
Inserting into the DOM:
appendChild — adds to the end of a parent:
javascriptparentElement.appendChild(newElement);
insertBefore — inserts before a specific child:
javascriptparentElement.insertBefore(newElement, referenceElement);
prepend / append — modern, flexible methods that accept multiple nodes or strings:
javascriptparentElement.prepend(newElement);   // inserts at the beginning
parentElement.append(newElement);    // inserts at the end
insertAdjacentElement — most precise positioning control:
javascriptreferenceElement.insertAdjacentElement('beforebegin', newElement); // before the element
referenceElement.insertAdjacentElement('afterbegin', newElement); 
referenceElement.insertAdjacentElement('beforeend', newElement);   
referenceElement.insertAdjacentElement('afterend', newElement);  

Answer_3:Event Bubbling is a concept in JavaScript where an event starts from the target element (the element that was clicked or triggered) and then bubbles up to its parent elements one by one until it reaches the top of the DOM (usually the document).
In simple words:
When you click a child element, the event also triggers on its parent, grandparent, and so on.
How Event Bubbling Works
Suppose we have this HTML:
<div id="parent">
    <button id="child">Click Me</button>
</div>
If we add event listeners:
document.getElementById("parent").addEventListener("click", function() {
    console.log("Parent clicked");
});
document.getElementById("child").addEventListener("click", function() {
    console.log("Child clicked");
});

Answer_4:Event delegation is a pattern where instead of attaching event listeners to individual child elements, you attach a single listener to a parent element and let bubbling do the work.
When an event fires on a child, it bubbles up to the parent, where you check event.target to determine which child was actually interacted with.
Without delegation (inefficient):
javascriptconst items = document.querySelectorAll('li');
items.forEach(item => {
  item.addEventListener('click', (e) => {
    console.log(e.target.textContent);
  });
});
This creates a separate listener for every <li>.
With delegation (efficient):
javascriptdocument.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
One listener handles all clicks, no matter how many <li> elements exist.
Why is it useful?
Performance — One listener on a parent is far cheaper than hundreds of listeners on individual children. This matters in large lists or tables.
Handles dynamic elements — If you add new child elements after the page loads, they automatically work with the existing listener. Without delegation, you'd have to manually attach listeners to every new element.
Less memory usage — Fewer event listeners means less memory consumed by your app.
Simpler cleanup — Removing one listener from the parent is cleaner than tracking and removing dozens of individual listeners.

Answer_5:preventDefault()
Purpose: Stops the default action of an element from happening.
It does NOT stop the event from bubbling up the DOM.
Example Uses:
Preventing a form submission
Preventing a link from navigating
Example:
document.getElementById("myLink").addEventListener("click", function(event) {
    event.preventDefault(); // Stops the link from navigating
    console.log("Link clicked, but no navigation!");
});
Clicking the link will not navigate, but the click event will still bubble to parent elements.
2️stopPropagation()
Purpose: Stops the event from bubbling (or capturing) to parent elements.
It does NOT stop the default action of the element.
Example:
document.getElementById("child").addEventListener("click", function(event) {
    event.stopPropagation(); // Stops bubbling to parent
    console.log("Child clicked!");
});
document.getElementById("parent").addEventListener("click", function() {
    console.log("Parent clicked!");
});
 Clicking the child logs "Child clicked!"
 Parent event does NOT run, but the default action (like a button click) still occurs.
