// ==UserScript==
// @name       PouetWindowShopping
// @version    0.0.1
// @description  Small screenshots on prodlists views
// @match      http://pouet.net/groups.php?which*
// @match      http://pouet.net/party.php?which*
// @copyright  2013+, mog@trbl.at
// ==/UserScript==

var MAX_IMG_HEIGHT = 48,
    IMG_BACKGROUND = '',//'#000',
    VERTICAL_CENTER_TEXT = false,
    TYPES = ['jpg', 'gif', 'png'];
    
var p = document.querySelectorAll("a[href^='prod.php']");

//group prod listing | fix header table (groupname/..) | bottom one as well
if(document.querySelectorAll("th[colspan='9']").length > 0) {
    document.querySelectorAll("th[colspan='9']")[0].setAttribute("colspan", "10");
	document.querySelectorAll("td[colspan='9']")[0].setAttribute("colspan", "10");
}

//group prod listing | "sort header"-row add new td at the beginning
var sortableRow = document.querySelectorAll("tr[bgcolor='#224488']")[1];

if(sortableRow) {
    
	sortableRow.insertBefore(document.createElement('th'), sortableRow.firstElementChild);
    
} else {
	//party prod listing | get the sort headers
	var partyProdsTable = document.querySelectorAll("body > div > table")[2];
    sortableRow = partyProdsTable.querySelectorAll("table[cellpadding='2'] > tbody > tr:not([bgcolor])");
    
    for(var i = 0; i < sortableRow.length; i++) {
    	sortableRow[i].firstElementChild.setAttribute('colspan', '2');
    }
}

function handleImg404(e){
    var currentURL = e.target.getAttribute('src').split('.'),
        typeIndex = TYPES.indexOf(currentURL[1]);
        
    if((++typeIndex) < TYPES.length)
        e.target.setAttribute('src', currentURL[0] + '.' + TYPES[typeIndex]);
}

for(var i = 0; i < p.length; i++){
    
    //ignore the links on the type images
    if(p[i].getElementsByTagName('img').length === 0) {
        
        var prodURL = p[i].getAttribute("href"),
            prodScreenshotURL = 'screenshots/' + prodURL.split('=')[1] + '.' + TYPES[0],
            img = document.createElement('img');
            td = document.createElement('td'),
            link = document.createElement('a'),
            prodLinkCell = p[i].parentNode.parentNode.parentNode.parentNode.parentNode;
            
        	td.style.cssText = "padding:0;text-align:center;background:" + IMG_BACKGROUND+";";
        
            //as we don't want to change any other table on the page
        	if(VERTICAL_CENTER_TEXT)
            	prodLinkCell.parentNode.style.cssText = "vertical-align: top;";

            link.setAttribute("href", prodURL);
            
            img.setAttribute("height", MAX_IMG_HEIGHT + 'px');
            img.onerror = handleImg404;
            img.setAttribute("src", prodScreenshotURL);
            
            link.appendChild(img);
            td.appendChild(link);
            prodLinkCell.parentNode.insertBefore(td, prodLinkCell);
    }
}
//*/
