(function (w, d) {
    'use strict';

    w.addEventListener( 'load', function ( ) {
        var timing = w.performance.timing,
            timingTotal = timing.domComplete - timing.fetchStart,
            timingNetwork = timing.connectEnd - timing.fetchStart,
            timingProcessing = timing.domComplete - timing.responseEnd,
            timingRatioNetwork = timingNetwork / timingTotal,
            timingRatioProcessing = timingProcessing / timingTotal;

        var toPercent = function ( fraction ) {
                return fraction * 100 + '%';
            },
            format = function ( ) {
                var args = arguments;
                return [].shift.call(args).replace(/{(\d+)}/g, function(match, number) { 
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
            };

        var widget = d.createElement( 'div' ),
            styles = [
                format( 'background: -webkit-linear-gradient(left, #bf616a, #bf616a {0}%, #ebcb8b {0}%, #ebcb8b {1}%, #a3be8c {1}%, #a3be8c)',
                    toPercent( timingRatioNetwork ),
                    toPercent( 1 - timingRatioProcessing ) ),
                'color: #2b303b',
                'font: bold 9px monospace',
                'height: 4px',
                'left: 0',
                'line-height: 18px',
                'position: fixed',
                'right: 0',
                'text-align: right',
                'top: 0'
            ].join(';');

        widget.innerHTML = format( '<div style="{0}">{1} ms</div>', styles, timingTotal );
        widget.firstChild.onmouseover = function ( ) {
            alert('yo!');
        };

        d.body.insertBefore( widget.firstChild, d.body.firstChild );
    } );

})(window, document);