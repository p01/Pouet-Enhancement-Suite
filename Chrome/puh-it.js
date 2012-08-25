/*jslint devel: true, browser: true*/

var PESInit = (function(){
	"use strict";
	
	fixOnelinerEncoding();

	function fixOnelinerEncoding() {
		
		var onelinerComment = getOneliner();

		if(onelinerComment) {
		
			$.each(onelinerComment, function(index, element){
				
				var comment = $(element).html();
				
				//remove line breaks in &am..p;
				comment = comment.replace(/(\r\n|\n|\r)/g, '');
		
				//fix encoding problem - &amp;#9829; => &#9829;
				comment = comment.replace(/&amp;#/g, '&#');
		
				//this occours on the homepage oneliner - &amp;amp;#9829; => &#9829;
				comment = comment.replace(/&amp;amp;#/g, '&#');
				
				$(element).html(comment);
			});
		}
	}
	
	function getOneliner() {
		
		//if only pouet wasn't such a birch to parse, this could be a oneliner
		var oneliner = $('img[title="talk"]'),
			onelinerLine,
			onelinerComment;
	
		if(oneliner) {
			
			//this is horrible, but finds the table rows with comments, title and submit
			oneliner = oneliner.parent().parent().parent();
			
			//the complete oneliner even needs more parent() calls
			if(!oneliner.parent().hasClass('box'))
				oneliner = oneliner.parent().parent().parent().parent();
			
			//use the user images and their link as hook, to get their parent <tr>
			onelinerLine = $(oneliner.find('a[href^="user.php?who"]').parent().parent());
			
			//now we need every third td, this holds the comment
			onelinerComment = onelinerLine.find('td:nth-child(3)');
		}
		
		return onelinerComment;
	}
});

var PESInitReadyCheck = (function () {

    "use strict";
    
    console.log("wub!");
    
    $(document).ready(PESInit);
});

window.onload = PESInitReadyCheck();