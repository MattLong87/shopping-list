//Single state object
var state = {
	//items is an array of items. statuses can be true or false to mean checked or unchecked. indexes are parallel
	items: [],
	statuses: []
};

//State modification functions
var addItem = function(state, item){
	state.items.push(item);
	state.statuses.push(false);
};

var removeItem = function(state, item){
	var itemIndex = state.items.indexOf(item);
	state.items.splice(itemIndex, 1);
	state.statuses.splice(itemIndex, 1);
}

var toggleItem = function(state, item){
	var itemIndex = state.items.indexOf(item);
	state.statuses[itemIndex] = !state.statuses[itemIndex];
}

//Rendering functions
var renderList = function(state, element){
	var htmlSnippet1Checked = "<li><span class='shopping-item shopping-item__checked'>";
	var htmlSnippet1Unchecked = "<li><span class='shopping-item'>";
	var htmlSnippet2 = '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
	var itemsHTML = state.items.map(function(item){
		var snippet = state.statuses[state.items.indexOf(item)] ? htmlSnippet1Checked : htmlSnippet1Unchecked;
		return snippet + item + htmlSnippet2;
		});
	element.html(itemsHTML);
};

//Event listeners
$('#js-shopping-list-form').submit(function(event){
	event.preventDefault();
	addItem(state, $('#shopping-list-entry').val());
	renderList(state, $('.shopping-list'));
	$('#shopping-list-entry').val("");
});

//Need to use event delegation here since list items are created dynamically
$('ul').on('click', 'li div .shopping-item-delete', function(event){
	var item = $(this).closest('li').children('.shopping-item').text();
	removeItem(state, item);
	renderList(state, $('.shopping-list'));
});

$('ul').on('click', 'li div .shopping-item-toggle', function(event){
	var item = $(this).closest('li').children('.shopping-item').text();
	toggleItem(state, item);
	renderList(state, $('.shopping-list'));
})