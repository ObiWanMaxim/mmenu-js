/**
 * Create an element with classname.
 *
 * @param 	{string}		selector	The nodeName and classnames for the element to create.
 * @return	{HTMLElement}				The created element.
 */
export var create = function (selector) {
    var args = selector.split('.');
    var elem = document.createElement(args.shift());
    //  IE11:
    args.forEach(function (classname) {
        elem.classList.add(classname);
    });
    //  Better browsers:
    // elem.classList.add(...args);
    return elem;
};
/**
 * Find all elements matching the selector.
 * Basically the same as element.querySelectorAll() but it returns an actuall array.
 *
 * @param 	{HTMLElement} 	element Element to search in.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of elements that match the filter.
 */
export var find = function (element, filter) {
    return Array.prototype.slice.call(element.querySelectorAll(filter));
};
/**
 * Find all child elements matching the (optional) selector.
 *
 * @param 	{HTMLElement} 	element Element to search in.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of child elements that match the filter.
 */
export var children = function (element, filter) {
    var children = Array.prototype.slice.call(element.children);
    return filter
        ? children.filter(function (child) { return child.matches(filter); })
        : children;
};
/**
 * Find text excluding text from within child elements.
 * @param   {HTMLElement}   element Element to search in.
 * @return  {string}                The text.
 */
export var text = function (element) {
    return Array.prototype.slice
        .call(element.childNodes)
        .filter(function (child) { return child.nodeType == 3; })
        .map(function (child) { return child.textContent; })
        .join(' ');
};
/**
 * Find all preceding elements matching the selector.
 *
 * @param 	{HTMLElement} 	element Element to start searching from.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of preceding elements that match the selector.
 */
export var parents = function (element, filter) {
    /** Array of preceding elements that match the selector. */
    var parents = [];
    /** Array of preceding elements that match the selector. */
    var parent = element.parentElement;
    while (parent) {
        parents.push(parent);
        parent = parent.parentElement;
    }
    return filter
        ? parents.filter(function (parent) { return parent.matches(filter); })
        : parents;
};
/**
 * Find all previous siblings matching the selecotr.
 *
 * @param 	{HTMLElement} 	element Element to start searching from.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of previous siblings that match the selector.
 */
export var prevAll = function (element, filter) {
    /** Array of previous siblings that match the selector. */
    var previous = [];
    /** Current element in the loop */
    var current = element.previousElementSibling;
    while (current) {
        if (!filter || current.matches(filter)) {
            previous.push(current);
        }
        current = current.previousElementSibling;
    }
    return previous;
};
/**
 * Get an element offset relative to the document.
 *
 * @param 	{HTMLElement}	 element 			Element to start measuring from.
 * @param 	{string}		 [direction=top] 	Offset top or left.
 * @return	{number}							The element offset relative to the document.
 */
export var offset = function (element, direction) {
    return (element.getBoundingClientRect()[direction] +
        document.body[direction === 'left' ? 'scrollLeft' : 'scrollTop']);
};
/**
 * Filter out non-listitem listitems.
 * @param  {array} listitems 	Elements to filter.
 * @return {array}				The filtered set of listitems.
 */
export var filterLI = function (listitems) {
    return listitems.filter(function (listitem) { return !listitem.matches('.mm-hidden'); });
};
/**
 * Find anchors in listitems (excluding anchor that open a sub-panel).
 * @param  {array} 	listitems 	Elements to filter.
 * @return {array}				The found set of anchors.
 */
export var filterLIA = function (listitems) {
    var anchors = [];
    filterLI(listitems).forEach(function (listitem) {
        anchors.push.apply(anchors, children(listitem, 'a.mm-listitem__text'));
    });
    return anchors.filter(function (anchor) { return !anchor.matches('.mm-btn_next'); });
};
/**
 * Refactor a classname on multiple elements.
 * @param {HTMLElement} element 	Element to refactor.
 * @param {string}		oldClass 	Classname to remove.
 * @param {string}		newClass 	Classname to add.
 */
export var reClass = function (element, oldClass, newClass) {
    if (element.matches('.' + oldClass)) {
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    }
};
