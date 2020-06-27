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

        window.addEventListener('keydown', function(event) {
            let sky = document.getElementById('sky');

            let roomLight = document.getElementById('roomLight');

            if(event.keyCode == 89) {
                if(time == 'night') {
                    sky.setAttribute('src', '#daySky');

                    sky.setAttribute('scale', '5 5 5');

                    roomLight.setAttribute('color', '#EEF66C');

                    time = 'day';
                } else {
                    sky.setAttribute('src', '#nightSky');

                    sky.setAttribute('scale', '0.2 0.2 0.2');

                    roomLight.setAttribute('color', 'lightgrey');

                    time = 'night';
                };
            };
        });

        el.addEventListener('ybuttondown', function(event) {
            let sky = document.getElementById('sky');

            let roomLight = document.getElementById('roomLight');
            
            if(time == 'night') {
                sky.setAttribute('src', '#daySky');

                sky.setAttribute('scale', '5 5 5');

                roomLight.setAttribute('color', '#EEF66C');

                time = 'day';
            } else {
                sky.setAttribute('src', '#nightSky');

                sky.setAttribute('scale', '0.2 0.2 0.2');

                roomLight.setAttribute('color', 'lightgrey');

                time = 'night';
            };
        });
    }
});

AFRAME.registerComponent('room-creator-params', {
    schema: {
        sky: {type: 'boolean', default: false},
        skyColor: {type: 'color', default: 'lightblue'},
        skyTexture: {type: 'string'},
        width: {type: 'number', default: 30},
        height: {type: 'number', default: 12},
        depth: {type: 'number', default: 30},
        wallNumber: {type: 'number', default: 4},
        wallTexture: {type: 'string'},
        wallTextureRepeat: {type: 'string'},
        floorTexture: {type: 'string'},
        floorTextureRepeat: {type: 'string'},
        ceiling: {type: 'boolean', default: true},
    },

    init: function() {
        let data = this.data;
        let el = this.el;  

        if(data.sky == true) {
            let sky = document.createElement('a-sky');
            el.appendChild(sky);
            sky.setAttribute('id', 'sky');
            sky.setAttribute('color', data.color);
            sky.setAttribute('src', data.skyTexture);
            sky.setAttribute('rotation', '0 270 0');
            sky.setAttribute('opacity', '1');
            sky.setAttribute('scale', '1 1 1');
        };

        let roomFloor = document.createElement('a-plane');
        el.appendChild(roomFloor);
        roomFloor.setAttribute('class', 'roomFloor');
        roomFloor.setAttribute('src', data.floorTexture);
        roomFloor.setAttribute('repet', data.floorTextureRepeat);
        roomFloor.setAttribute('color', 'lightgrey');
        roomFloor.setAttribute('position', '0 0 0');
        roomFloor.setAttribute('width', data.width);
        roomFloor.setAttribute('height', data.depth);
        roomFloor.setAttribute('rotation', '270 0 0');
        roomFloor.setAttribute('side', 'double');
        roomFloor.setAttribute('static-body', '');

        let wallsPositionY = data.height / 2;

        let wall1 = document.createElement('a-plane');
        let wall1PositionX = data.depth / 2;
        el.appendChild(wall1);
        wall1.setAttribute('class', 'walls');
        wall1.setAttribute('src', data.wallTexture);
        wall1.setAttribute('repeat', data.wallTextureRepeat);
        wall1.setAttribute('position', `-${wall1PositionX} ${wallsPositionY} 0`);
        wall1.setAttribute('width', data.width);
        wall1.setAttribute('height', data.height);
        wall1.setAttribute('side', 'double');
        wall1.setAttribute('rotation', '0 90 0');
        wall1.setAttribute('static-body', '');

        /*
        !let babiaLogo = document.createElement('a-plane');
        roomEntity.appendChild(babiaLogo);
        babiaLogo.setAttribute('position', '-14.95 4 0');
        babiaLogo.setAttribute('rotation', '0 90 0');
        babiaLogo.setAttribute('width', '7.52');
        babiaLogo.setAttribute('height', '6.66');
        babiaLogo.setAttribute('src', '#babiaLogo');*/

        let wall2 = document.createElement('a-plane');
        let wall2PositionX = data.depth / 2;
        el.appendChild(wall2);
        wall2.setAttribute('class', 'walls');
        wall2.setAttribute('src', data.wallTexture);
        wall2.setAttribute('repeat', data.wallTextureRepeat);
        wall2.setAttribute('position', `${wall2PositionX} ${wallsPositionY} 0`);
        wall2.setAttribute('width', data.width);
        wall2.setAttribute('height', data.height);
        wall2.setAttribute('side', 'double');
        wall2.setAttribute('rotation', '0 90 0');
        wall2.setAttribute('static-body', '');

        let wall3 = document.createElement('a-plane');
        let wall3positionZ = data.width / 2
        el.appendChild(wall3);
        wall3.setAttribute('class', 'walls');
        wall3.setAttribute('src', data.wallTexture);
        wall3.setAttribute('repeat', data.wallTextureRepeat);
        wall3.setAttribute('position', `0 ${wallsPositionY} -${wall3positionZ}`);
        wall3.setAttribute('width', data.depth);
        wall3.setAttribute('height', data.height);
        wall3.setAttribute('side', 'double');
        wall3.setAttribute('rotation', '0 0 0');
        wall3.setAttribute('static-body', '');

        let wall4 = document.createElement('a-plane');
        let wall4positionZ = data.width / 2
        el.appendChild(wall4);
        wall4.setAttribute('class', 'walls');
        wall4.setAttribute('src', data.wallTexture);
        wall4.setAttribute('repeat', data.wallTextureRepeat);
        wall4.setAttribute('position', `0 ${wallsPositionY} ${wall4positionZ}`);
        wall4.setAttribute('width', data.depth);
        wall4.setAttribute('height', data.height);
        wall4.setAttribute('side', 'double');
        wall4.setAttribute('rotation', '0 0 0');
        wall4.setAttribute('static-body', '');

        if(data.ceiling == true) {
            let ceiling = document.createElement('a-plane');
            el.appendChild(ceiling);
            ceiling.setAttribute('class', 'ceiling');
            ceiling.setAttribute('position', '0 9 0');
            ceiling.setAttribute('width', '30');
            ceiling.setAttribute('height', '30');
            ceiling.setAttribute('rotation', '90 0 0');
            ceiling.setAttribute('side', 'double');
            ceiling.setAttribute('static-body', '');
        };

        let roomLight = document.createElement('a-light');
        el.appendChild(roomLight);
        roomLight.setAttribute('id', 'roomLight');
        roomLight.setAttribute('type', 'point');
        roomLight.setAttribute('color', 'lightgrey');
        roomLight.setAttribute('intensity', '0.5');
        roomLight.setAttribute('position', '0 8.5 0');

        /*
        TODO: let terraceFloor = document.createElement('a-plane');
        roomEntity.appendChild(terraceFloor);
        terraceFloor.setAttribute('id', 'terraceFloor');
        terraceFloor.setAttribute('src', '#terraceFloor');
        terraceFloor.setAttribute('repeat', '12 2 1');
        terraceFloor.setAttribute('width', '30');
        terraceFloor.setAttribute('height', '8');
        terraceFloor.setAttribute('rotation', '270 90 0');
        terraceFloor.setAttribute('position', '19 -0.5 0');
        terraceFloor.setAttribute('side', 'double');
        terraceFloor.setAttribute('roughness', '1');
        terraceFloor.setAttribute('static-body', '');

        let terraceGlass1 = document.createElement('a-plane');
        roomEntity.appendChild(terraceGlass1);
        terraceGlass1.setAttribute('class', 'glassPanes');
        terraceGlass1.setAttribute('width', '30');
        terraceGlass1.setAttribute('height', '1');
        terraceGlass1.setAttribute('opacity', '0.05');
        terraceGlass1.setAttribute('side', 'double');
        terraceGlass1.setAttribute('rotation', '0 90 0');
        terraceGlass1.setAttribute('position', ' 23 0 0');
        terraceGlass1.setAttribute('static-body', '');

        let terraceGlass2 = document.createElement('a-plane');
        roomEntity.appendChild(terraceGlass2);
        terraceGlass2.setAttribute('class', 'glassPanes');
        terraceGlass2.setAttribute('width', '8');
        terraceGlass2.setAttribute('height', '1');
        terraceGlass2.setAttribute('opacity', '0.05');
        terraceGlass2.setAttribute('side', 'double');
        terraceGlass2.setAttribute('rotation', '0 0 0');
        terraceGlass2.setAttribute('position', ' 19 0 15');
        terraceGlass2.setAttribute('static-body', '');

        let terraceGlass3 = document.createElement('a-plane');
        roomEntity.appendChild(terraceGlass3);
        terraceGlass3.setAttribute('class', 'glassPanes');
        terraceGlass3.setAttribute('width', '8');
        terraceGlass3.setAttribute('height', '1');
        terraceGlass3.setAttribute('opacity', '0.05');
        terraceGlass3.setAttribute('side', 'double');
        terraceGlass3.setAttribute('rotation', '0 0 0');
        terraceGlass3.setAttribute('position', ' 19 0 -15');
        terraceGlass3.setAttribute('static-body', '');

        let separation = document.createElement('a-box');
        roomEntity.appendChild(separation);
        separation.setAttribute('id', 'separation');
        separation.setAttribute('color', 'lightgrey');
        separation.setAttribute('scale', '0.1 0.1 30');
        separation.setAttribute('position', '15 -0.5 0');
        separation.setAttribute('static-body', '');

        let glassPaneMark1 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark1);
        glassPaneMark1.setAttribute('class', 'glassPaneMarks');
        glassPaneMark1.setAttribute('color', 'grey');
        glassPaneMark1.setAttribute('scale', '0.1 0.1 30');
        glassPaneMark1.setAttribute('position', '23 -0.5 0');
        glassPaneMark1.setAttribute('static-body', '');

        let glassPaneMark2 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark2);
        glassPaneMark2.setAttribute('class', 'glassPaneMarks');
        glassPaneMark2.setAttribute('color', 'grey');
        glassPaneMark2.setAttribute('scale', '8 0.1 0.1');
        glassPaneMark2.setAttribute('position', '19 -0.5 -15');
        glassPaneMark2.setAttribute('static-body', '');

        let glassPaneMark3 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark3);
        glassPaneMark3.setAttribute('class', 'glassPaneMarks');
        glassPaneMark3.setAttribute('color', 'grey');
        glassPaneMark3.setAttribute('scale', '8 0.1 0.1');
        glassPaneMark3.setAttribute('position', '19 -0.5 15');
        glassPaneMark3.setAttribute('static-body', '');

        let glassPaneMark4 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark4);
        glassPaneMark4.setAttribute('class', 'glassPaneMarks');
        glassPaneMark4.setAttribute('color', 'grey');
        glassPaneMark4.setAttribute('scale', '0.03 1 0.03');
        glassPaneMark4.setAttribute('opacity', '0.75');
        glassPaneMark4.setAttribute('position', '23 0 15');
        glassPaneMark4.setAttribute('static-body', '');

        let glassPaneMark5 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark5);
        glassPaneMark5.setAttribute('class', 'glassPaneMarks');
        glassPaneMark5.setAttribute('color', 'grey');
        glassPaneMark5.setAttribute('scale', '0.03 1 0.03');
        glassPaneMark5.setAttribute('opacity', '0.75');
        glassPaneMark5.setAttribute('position', '23 0 -15');
        glassPaneMark5.setAttribute('static-body', '');*/
    }
});

AFRAME.registerComponent('room-creator', {
    init: function() {
        let data = this.data;
        let el = this.el;  

        let scene = document.getElementById('scene');

        let roomEntity = document.getElementById('roomEntity');

        let sky = document.createElement('a-sky');
        roomEntity.appendChild(sky);
        sky.setAttribute('id', 'sky');
        sky.setAttribute('src', '#nightSky');
        sky.setAttribute('rotation', '0 270 0');
        sky.setAttribute('opacity', '1');
        sky.setAttribute('scale', '0.2 0.2 0.2');

        let roomFloor = document.createElement('a-plane');
        roomEntity.appendChild(roomFloor);
        roomFloor.setAttribute('class', 'roomFloor');
        roomFloor.setAttribute('src', '#interiorFloor');
        roomFloor.setAttribute('color', 'lightgrey');
        roomFloor.setAttribute('position', '0 -0.5 0');
        roomFloor.setAttribute('width', '30');
        roomFloor.setAttribute('height', '30');
        roomFloor.setAttribute('rotation', '270 0 0');
        roomFloor.setAttribute('side', 'double');
        roomFloor.setAttribute('static-body', '');

        let wall1 = document.createElement('a-plane');
        roomEntity.appendChild(wall1);
        wall1.setAttribute('class', 'walls');
        wall1.setAttribute('src', '#wall');
        wall1.setAttribute('repeat', '20 20 1');
        wall1.setAttribute('position', '0 -1 15');
        wall1.setAttribute('width', '30');
        wall1.setAttribute('height', '20');
        wall1.setAttribute('side', 'double');
        wall1.setAttribute('rotation', '0 0 0');
        wall1.setAttribute('static-body', '');

        let babiaLogo = document.createElement('a-plane');
        roomEntity.appendChild(babiaLogo);
        babiaLogo.setAttribute('position', '-14.95 4 0');
        babiaLogo.setAttribute('rotation', '0 90 0');
        babiaLogo.setAttribute('width', '7.52');
        babiaLogo.setAttribute('height', '6.66');
        babiaLogo.setAttribute('src', '#babiaLogo');

        let wall2 = document.createElement('a-plane');
        roomEntity.appendChild(wall2);
        wall2.setAttribute('class', 'walls');
        wall2.setAttribute('src', '#wall');
        wall2.setAttribute('repeat', '20 20 1');
        wall2.setAttribute('position', '0 -1 -15');
        wall2.setAttribute('width', '30');
        wall2.setAttribute('height', '20');
        wall2.setAttribute('side', 'double');
        wall2.setAttribute('rotation', '0 0 0');
        wall2.setAttribute('static-body', '');

        let wall3 = document.createElement('a-plane');
        roomEntity.appendChild(wall3);
        wall3.setAttribute('class', 'walls');
        wall3.setAttribute('src', '#wall');
        wall3.setAttribute('repeat', '20 20 1');
        wall3.setAttribute('position', '-15 -1 0');
        wall3.setAttribute('width', '30');
        wall3.setAttribute('height', '20');
        wall3.setAttribute('side', 'double');
        wall3.setAttribute('rotation', '0 90 0');
        wall3.setAttribute('static-body', '');

        let ceiling = document.createElement('a-plane');
        roomEntity.appendChild(ceiling);
        ceiling.setAttribute('class', 'ceiling');
        ceiling.setAttribute('position', '0 9 0');
        ceiling.setAttribute('width', '30');
        ceiling.setAttribute('height', '30');
        ceiling.setAttribute('rotation', '90 0 0');
        ceiling.setAttribute('side', 'double');
        ceiling.setAttribute('static-body', '');

        let roomLight = document.createElement('a-light');
        roomEntity.appendChild(roomLight);
        roomLight.setAttribute('id', 'roomLight');
        roomLight.setAttribute('type', 'point');
        roomLight.setAttribute('color', 'lightgrey');
        roomLight.setAttribute('intensity', '0.5');
        roomLight.setAttribute('position', '0 8.5 0');

        let terraceFloor = document.createElement('a-plane');
        roomEntity.appendChild(terraceFloor);
        terraceFloor.setAttribute('id', 'terraceFloor');
        terraceFloor.setAttribute('src', '#terraceFloor');
        terraceFloor.setAttribute('repeat', '12 2 1');
        terraceFloor.setAttribute('width', '30');
        terraceFloor.setAttribute('height', '8');
        terraceFloor.setAttribute('rotation', '270 90 0');
        terraceFloor.setAttribute('position', '19 -0.5 0');
        terraceFloor.setAttribute('side', 'double');
        terraceFloor.setAttribute('roughness', '1');
        terraceFloor.setAttribute('static-body', '');

        let terraceGlass1 = document.createElement('a-plane');
        roomEntity.appendChild(terraceGlass1);
        terraceGlass1.setAttribute('class', 'glassPanes');
        terraceGlass1.setAttribute('width', '30');
        terraceGlass1.setAttribute('height', '1');
        terraceGlass1.setAttribute('opacity', '0.05');
        terraceGlass1.setAttribute('side', 'double');
        terraceGlass1.setAttribute('rotation', '0 90 0');
        terraceGlass1.setAttribute('position', ' 23 0 0');
        terraceGlass1.setAttribute('static-body', '');

        let terraceGlass2 = document.createElement('a-plane');
        roomEntity.appendChild(terraceGlass2);
        terraceGlass2.setAttribute('class', 'glassPanes');
        terraceGlass2.setAttribute('width', '8');
        terraceGlass2.setAttribute('height', '1');
        terraceGlass2.setAttribute('opacity', '0.05');
        terraceGlass2.setAttribute('side', 'double');
        terraceGlass2.setAttribute('rotation', '0 0 0');
        terraceGlass2.setAttribute('position', ' 19 0 15');
        terraceGlass2.setAttribute('static-body', '');

        let terraceGlass3 = document.createElement('a-plane');
        roomEntity.appendChild(terraceGlass3);
        terraceGlass3.setAttribute('class', 'glassPanes');
        terraceGlass3.setAttribute('width', '8');
        terraceGlass3.setAttribute('height', '1');
        terraceGlass3.setAttribute('opacity', '0.05');
        terraceGlass3.setAttribute('side', 'double');
        terraceGlass3.setAttribute('rotation', '0 0 0');
        terraceGlass3.setAttribute('position', ' 19 0 -15');
        terraceGlass3.setAttribute('static-body', '');

        let separation = document.createElement('a-box');
        roomEntity.appendChild(separation);
        separation.setAttribute('id', 'separation');
        separation.setAttribute('color', 'lightgrey');
        separation.setAttribute('scale', '0.1 0.1 30');
        separation.setAttribute('position', '15 -0.5 0');
        separation.setAttribute('static-body', '');

        let glassPaneMark1 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark1);
        glassPaneMark1.setAttribute('class', 'glassPaneMarks');
        glassPaneMark1.setAttribute('color', 'grey');
        glassPaneMark1.setAttribute('scale', '0.1 0.1 30');
        glassPaneMark1.setAttribute('position', '23 -0.5 0');
        glassPaneMark1.setAttribute('static-body', '');

        let glassPaneMark2 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark2);
        glassPaneMark2.setAttribute('class', 'glassPaneMarks');
        glassPaneMark2.setAttribute('color', 'grey');
        glassPaneMark2.setAttribute('scale', '8 0.1 0.1');
        glassPaneMark2.setAttribute('position', '19 -0.5 -15');
        glassPaneMark2.setAttribute('static-body', '');

        let glassPaneMark3 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark3);
        glassPaneMark3.setAttribute('class', 'glassPaneMarks');
        glassPaneMark3.setAttribute('color', 'grey');
        glassPaneMark3.setAttribute('scale', '8 0.1 0.1');
        glassPaneMark3.setAttribute('position', '19 -0.5 15');
        glassPaneMark3.setAttribute('static-body', '');

        let glassPaneMark4 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark4);
        glassPaneMark4.setAttribute('class', 'glassPaneMarks');
        glassPaneMark4.setAttribute('color', 'grey');
        glassPaneMark4.setAttribute('scale', '0.03 1 0.03');
        glassPaneMark4.setAttribute('opacity', '0.75');
        glassPaneMark4.setAttribute('position', '23 0 15');
        glassPaneMark4.setAttribute('static-body', '');

        let glassPaneMark5 = document.createElement('a-box');
        roomEntity.appendChild(glassPaneMark5);
        glassPaneMark5.setAttribute('class', 'glassPaneMarks');
        glassPaneMark5.setAttribute('color', 'grey');
        glassPaneMark5.setAttribute('scale', '0.03 1 0.03');
        glassPaneMark5.setAttribute('opacity', '0.75');
        glassPaneMark5.setAttribute('position', '23 0 -15');
        glassPaneMark5.setAttribute('static-body', '');
    }
});