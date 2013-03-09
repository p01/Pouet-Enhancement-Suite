// ==UserScript==
// @name       preFlight
// @version    0.0.1
// @description  shows the preview of a thread response under the message field
// @match      http://pouet.net/topic.php?which*
// @copyright  2013+, mog@trbl.at
// ==/UserScript==

var textArea = document.querySelectorAll("textarea[name='message']")[0],
    form = document.querySelectorAll("form[action='add.php']")[0],
    previewFrame = document.createElement('iframe'),
    firstKeypress = true,
    cooldownTimer;

previewFrame.setAttribute('name', 'previewFrame');
previewFrame.setAttribute('scrolling', 'no');
previewFrame.style.cssText = 'border:0;width:100%;';

previewFrame.onload = resizePreview;

textArea.onkeyup = startKBPreviewUpdateDDoSPreventionTimer;


function startKBPreviewUpdateDDoSPreventionTimer(e) {
  
    clearTimeout(cooldownTimer);
	cooldownTimer = setTimeout(updatePreview, 1000);
}

function updatePreview() {
	
    if(firstKeypress){
        firstKeypress = false;
        form.parentNode.insertBefore(previewFrame, form.nextSibling);
    }
    
    clearTimeout(cooldownTimer);
    
    var type = 'topic',
		oldAction = form.action;
    
    previewFrame.setAttribute('src', 'preview_' + type + '.php');
	form.action = 'preview_' + type + '.php';
	form.target = 'previewFrame';
  	form.submit();
    
    form.action = oldAction;
    form.target = '_self';
}

function resizePreview() {
	previewFrame.height = previewFrame.contentWindow.document.body.scrollHeight + 'px';
}
