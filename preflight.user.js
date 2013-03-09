// ==UserScript==
// @name         preFlight
// @version      0.0.4
// @description  shows the preview of a thread response under the message field
// @include      http://pouet.net/topic.php?which*
// @include      http://www.pouet.net/topic.php?which*
// @copyright    2013+, mog@trbl.at & mathieu@p01.org
// ==/UserScript==

;(function() {
    var textArea = document.querySelector("textarea[name='message']"),
        form = document.querySelector("form[action='add.php']"),
        previewFrame = document.createElement('iframe'),
        lastEvent = 0,
        lastValue = "",
        throttleDelay = 250,
        throttleTimeout;

    if(!textArea || !form)
        return;

    previewFrame.setAttribute('name', 'previewFrame'+Math.random());
    previewFrame.setAttribute('scrolling', 'no');
    previewFrame.style.cssText = 'border: 0; width: 100%;';
    previewFrame.onload = function() {
        previewFrame.height = previewFrame.contentWindow.document.body.scrollHeight + 'px';
    };

    textArea.oninput = textArea.onkeyup = function updatePreview() {

        clearTimeout(throttleTimeout);

        // too fast ?
        var now = Date.now();
        var dif = now - lastEvent;
        lastEvent = now;
        if(dif < throttleDelay)
            return throttleTimeout = setTimeout(updatePreview, throttleDelay);

        // no change ?
        var trimmedValue = textArea.value.replace(/^\s+|\s+$/g, "");
        if(trimmedValue == lastValue)
            return;

        // first input ?
        if(!previewFrame.parentNode)
            return form.parentNode.insertBefore(previewFrame, form.nextSibling);

        // preview!
        lastValue = trimmedValue;
        var oldAction = form.action;
        var type = (location.pathname.match(/\/(\w+)\.php/)||['topic']).pop();
        form.action = 'preview_' + type + '.php';
        form.target = previewFrame.name;
        form.submit();

        form.action = oldAction;
        form.target = '_self';
    };

})();
