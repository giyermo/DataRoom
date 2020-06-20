let time = 'night';

AFRAME.registerComponent('info-podium', {
    schema: {
        podiumWidth: {type: 'string', default: '5.5'},
        podiumHeight: {type: 'string', default: '1'},
        podiumDepth: {type: 'string', default: '5.5'},
        podiumColor: {type: 'string', default: 'grey'},
    },

    init: function() {
        let data = this.data;
        let el = this.el;  

        let scene = document.getElementById('scene');

        let podium = document.createElement('a-box');

        el.appendChild(podium);

        podium.setAttribute('width', data.podiumWidth);

        podium.setAttribute('heigth', data.podiumHeight);

        podium.setAttribute('depth', data.podiumDepth);

        podium.setAttribute('color', data.podiumColor);

        podium.setAttribute('position', data.podiumPosition);

        podium.setAttribute('static-body', '');
    }
});

AFRAME.registerComponent('time-changer', {
    init: function() {
        let data = this.data;
        let el = this.el;  

        let sky = document.getElementById('sky');

        let roomLight = document.getElementById('roomLight');

        el.addEventListener('ybuttondown', function(evt) {
            if(time == 'night') {
                sky.setAttribute('src', '#daySky');

                roomLight.setAttribute('color', '#EEF66C');

                time = 'day';
            } else {
                sky.setAttribute('src', '#nightSky');

                roomLight.setAttribute('color', 'lightgrey');

                time = 'night';
            };
        });
    }
});