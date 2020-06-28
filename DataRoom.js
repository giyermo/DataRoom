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

AFRAME.registerComponent('room-creator', {
    schema: {
        sky: {type: 'boolean', default: false},
        skyColor: {type: 'color', default: 'lightblue'},
        skyTexture: {type: 'string'},

        width: {type: 'number', default: 30},
        height: {type: 'number', default: 12},
        depth: {type: 'number', default: 30},

        frontWall: {type: 'boolean', default: true},
        backWall: {type: 'boolean', default: true},
        rightWall: {type: 'boolean', default: true},
        leftWall: {type: 'boolean', default: true},
        
        ceiling: {type: 'boolean', default: true},

        wallColor: {type: 'color', default: 'lightgrey'},
        wallTexture: {type: 'string'},
        wallTextureRepeat: {type: 'string'},

        floorColor: {type: 'color', default: 'grey'},
        floorTexture: {type: 'string'},
        floorTextureRepeat: {type: 'string'},

        frontTerrace: {type: 'boolean', default: false},
        frontTerraceWidth: {type: 'number', default: 30},
        frontTerraceDepth: {type: 'number', default: 8},
        frontTerraceColor: {type: 'color', default: 'lightblue'},
        frontTerraceTexture: {type: 'string'},
        frontTerraceTextureRepeat: {type: 'string'},

        backTerrace: {type: 'boolean', default: false},
        backTerraceWidth: {type: 'number', default: 30},
        backTerraceDepth: {type: 'number', default: 8},
        backTerraceColor: {type: 'color', default: 'lightblue'},
        backTerraceTexture: {type: 'string'},
        backTerraceTextureRepeat: {type: 'string'},

        rightTerrace: {type: 'boolean', default: false},
        rightTerraceWidth: {type: 'number', default: 30},
        rightTerraceDepth: {type: 'number', default: 8},
        rightTerraceColor: {type: 'color', default: 'lightblue'},
        rightTerraceTexture: {type: 'string'},
        rightTerraceTextureRepeat: {type: 'string'},

        leftTerrace: {type: 'boolean', default: false},
        leftTerraceWidth: {type: 'number', default: 30},
        leftTerraceDepth: {type: 'number', default: 8},
        leftTerraceColor: {type: 'color', default: 'lightblue'},
        leftTerraceTexture: {type: 'string'},
        leftTerraceTextureRepeat: {type: 'string'},
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

        if(data.leftWall == true) {
            let leftWall = document.createElement('a-plane');
            let leftWallPositionX = data.depth / 2;
            el.appendChild(leftWall);
            leftWall.setAttribute('class', 'walls');
            leftWall.setAttribute('src', data.wallTexture);
            leftWall.setAttribute('repeat', data.wallTextureRepeat);
            leftWall.setAttribute('position', `-${leftWallPositionX} ${wallsPositionY} 0`);
            leftWall.setAttribute('width', data.width);
            leftWall.setAttribute('height', data.height);
            leftWall.setAttribute('side', 'double');
            leftWall.setAttribute('rotation', '0 90 0');
            leftWall.setAttribute('static-body', '');
        };

        if(data.rightWall == true) {
            let rightWall = document.createElement('a-plane');
            let rightWallPositionX = data.depth / 2;
            el.appendChild(rightWall);
            rightWall.setAttribute('class', 'walls');
            rightWall.setAttribute('src', data.wallTexture);
            rightWall.setAttribute('repeat', data.wallTextureRepeat);
            rightWall.setAttribute('position', `${rightWallPositionX} ${wallsPositionY} 0`);
            rightWall.setAttribute('width', data.width);
            rightWall.setAttribute('height', data.height);
            rightWall.setAttribute('side', 'double');
            rightWall.setAttribute('rotation', '0 90 0');
            rightWall.setAttribute('static-body', '');
        };

        if(data.frontWall == true) {
            let frontWall = document.createElement('a-plane');
            let frontWallpositionZ = data.width / 2
            el.appendChild(frontWall);
            frontWall.setAttribute('class', 'walls');
            frontWall.setAttribute('src', data.wallTexture);
            frontWall.setAttribute('repeat', data.wallTextureRepeat);
            frontWall.setAttribute('position', `0 ${wallsPositionY} -${frontWallpositionZ}`);
            frontWall.setAttribute('width', data.depth);
            frontWall.setAttribute('height', data.height);
            frontWall.setAttribute('side', 'double');
            frontWall.setAttribute('rotation', '0 0 0');
            frontWall.setAttribute('static-body', '');
        };

        if(data.backWall == true) {
            let backWall = document.createElement('a-plane');
            let backWallpositionZ = data.width / 2
            el.appendChild(backWall);
            backWall.setAttribute('class', 'walls');
            backWall.setAttribute('src', data.wallTexture);
            backWall.setAttribute('repeat', data.wallTextureRepeat);
            backWall.setAttribute('position', `0 ${wallsPositionY} ${backWallpositionZ}`);
            backWall.setAttribute('width', data.depth);
            backWall.setAttribute('height', data.height);
            backWall.setAttribute('side', 'double');
            backWall.setAttribute('rotation', '0 0 0');
            backWall.setAttribute('static-body', '');
        };

        if(data.ceiling == true) {
            let ceiling = document.createElement('a-plane');
            el.appendChild(ceiling);
            ceiling.setAttribute('class', 'ceiling');
            ceiling.setAttribute('position', `0 ${data.height} 0`);
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

        if(data.rightTerrace == true) {
            console.log('creating right terrace');
            let rightTerraceEntity = document.createElement('a-entity');
            rightTerraceEntity.setAttribute('id', 'rightTerraceEntity');

            el.appendChild(rightTerraceEntity);

            let rightTerraceXPosition = data.width / 2 + data.rightTerraceDepth / 2;

            rightTerraceEntity.setAttribute('position', `${rightTerraceXPosition} 0 0`);

            let terraceFloor = document.createElement('a-plane');
            rightTerraceEntity.appendChild(terraceFloor);
            terraceFloor.setAttribute('id', 'terraceFloor');
            terraceFloor.setAttribute('src', data.rightTerraceTexture);
            terraceFloor.setAttribute('repeat', data.rightTerraceTextureRepeat);
            terraceFloor.setAttribute('width', data.rightTerraceWidth);
            terraceFloor.setAttribute('height', data.rightTerraceDepth);
            terraceFloor.setAttribute('rotation', '270 90 0');
            terraceFloor.setAttribute('position', `0 0 0`);
            terraceFloor.setAttribute('side', 'double');
            terraceFloor.setAttribute('roughness', '1');
            terraceFloor.setAttribute('static-body', '');

            let terraceGlassFrontXPosition = data.rightTerraceDepth / 2;

            let terraceGlassFront = document.createElement('a-plane');
            rightTerraceEntity.appendChild(terraceGlassFront);
            terraceGlassFront.setAttribute('class', 'glassPanes');
            terraceGlassFront.setAttribute('width', data.rightTerraceWidth);
            terraceGlassFront.setAttribute('height', '1');
            terraceGlassFront.setAttribute('opacity', '0.05');
            terraceGlassFront.setAttribute('side', 'double');
            terraceGlassFront.setAttribute('rotation', '0 90 0');
            terraceGlassFront.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 0`);
            terraceGlassFront.setAttribute('static-body', '');
    
            let terraceGlassRightAndLeftXPosition = data.rightTerraceDepth / 2;

            let terraceGlassRightAndLeftZPosition = data.rightTerraceWidth / 2

            let terraceGlassRight = document.createElement('a-plane');
            rightTerraceEntity.appendChild(terraceGlassRight);
            terraceGlassRight.setAttribute('class', 'glassPanes');
            terraceGlassRight.setAttribute('width', data.rightTerraceDepth);
            terraceGlassRight.setAttribute('height', '1');
            terraceGlassRight.setAttribute('opacity', '0.05');
            terraceGlassRight.setAttribute('side', 'double');
            terraceGlassRight.setAttribute('rotation', '0 0 0');
            terraceGlassRight.setAttribute('position', `0 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassRight.setAttribute('static-body', '');
    
            let terraceGlassLeft = document.createElement('a-plane');
            rightTerraceEntity.appendChild(terraceGlassLeft);
            terraceGlassLeft.setAttribute('class', 'glassPanes');
            terraceGlassLeft.setAttribute('width', data.rightTerraceDepth);
            terraceGlassLeft.setAttribute('height', '1');
            terraceGlassLeft.setAttribute('opacity', '0.05');
            terraceGlassLeft.setAttribute('side', 'double');
            terraceGlassLeft.setAttribute('rotation', '0 0 0');
            terraceGlassLeft.setAttribute('position', `0 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassLeft.setAttribute('static-body', '');

            if(data.width < data.rightTerraceWidth) {
                let additionalGlassPanesWidth = (data.rightTerraceWidth - data.width) / 2;

                let additionalGlassPanesZposition = data.width / 2 + additionalGlassPanesWidth / 2;

                let terraceGlassBackLeft = document.createElement('a-plane');
                rightTerraceEntity.appendChild(terraceGlassBackLeft);
                terraceGlassBackLeft.setAttribute('class', 'glassPanes');
                terraceGlassBackLeft.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackLeft.setAttribute('height', '1');
                terraceGlassBackLeft.setAttribute('opacity', '0.05');
                terraceGlassBackLeft.setAttribute('side', 'double');
                terraceGlassBackLeft.setAttribute('rotation', '0 90 0');
                terraceGlassBackLeft.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${additionalGlassPanesZposition}`);
                terraceGlassBackLeft.setAttribute('static-body', '');

                let terraceGlassBackRight = document.createElement('a-plane');
                rightTerraceEntity.appendChild(terraceGlassBackRight);
                terraceGlassBackRight.setAttribute('class', 'glassPanes');
                terraceGlassBackRight.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackRight.setAttribute('height', '1');
                terraceGlassBackRight.setAttribute('opacity', '0.05');
                terraceGlassBackRight.setAttribute('side', 'double');
                terraceGlassBackRight.setAttribute('rotation', '0 90 0');
                terraceGlassBackRight.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${additionalGlassPanesZposition}`);
                terraceGlassBackRight.setAttribute('static-body', '');
            };
    
            let terraceSeparation = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceSeparation);
            terraceSeparation.setAttribute('id', 'rightTerraceSeparation');
            terraceSeparation.setAttribute('color', 'lightgrey');
            terraceSeparation.setAttribute('scale', `0.1 0.1 ${data.rightTerraceWidth}`);
            terraceSeparation.setAttribute('position', `-${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceSeparation.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFront = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceGlassPaneMarkFront);
            terraceGlassPaneMarkFront.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFront.setAttribute('color', 'grey');
            terraceGlassPaneMarkFront.setAttribute('scale', `0.1 0.1 ${data.rightTerraceWidth}`);
            terraceGlassPaneMarkFront.setAttribute('position', `${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceGlassPaneMarkFront.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkLeft = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceGlassPaneMarkLeft);
            terraceGlassPaneMarkLeft.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkLeft.setAttribute('color', 'grey');
            terraceGlassPaneMarkLeft.setAttribute('scale', `${data.rightTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkLeft.setAttribute('position', `0 0 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkLeft.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkRight = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceGlassPaneMarkRight);
            terraceGlassPaneMarkRight.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkRight.setAttribute('color', 'grey');
            terraceGlassPaneMarkRight.setAttribute('scale', `${data.rightTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkRight.setAttribute('position', `0 0 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkRight.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontRightUp = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceGlassPaneMarkFrontRightUp);
            terraceGlassPaneMarkFrontRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontRightUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontLeftUp = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceGlassPaneMarkFrontLeftUp);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('static-body', '');

            let terraceGlassPaneMarkBackRightUp = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceGlassPaneMarkBackRightUp);
            terraceGlassPaneMarkBackRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackRightUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkBackLeftUp = document.createElement('a-box');
            rightTerraceEntity.appendChild(terraceGlassPaneMarkBackLeftUp);
            terraceGlassPaneMarkBackLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackLeftUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackLeftUp.setAttribute('static-body', '');
        };

        if(data.leftTerrace == true) {
            console.log('creating left terrace');
            let leftTerraceEntity = document.createElement('a-entity');
            leftTerraceEntity.setAttribute('id', 'leftTerraceEntity');

            el.appendChild(leftTerraceEntity);

            let leftTerraceXPosition = data.width / 2 + data.leftTerraceDepth / 2;

            leftTerraceEntity.setAttribute('position', `-${leftTerraceXPosition} 0 0`);
            leftTerraceEntity.setAttribute('rotation', `0 180 0`);

            let terraceFloor = document.createElement('a-plane');
            leftTerraceEntity.appendChild(terraceFloor);
            terraceFloor.setAttribute('id', 'terraceFloor');
            terraceFloor.setAttribute('src', data.leftTerraceTexture);
            terraceFloor.setAttribute('repeat', data.leftTerraceTextureRepeat);
            terraceFloor.setAttribute('width', data.leftTerraceWidth);
            terraceFloor.setAttribute('height', data.leftTerraceDepth);
            terraceFloor.setAttribute('rotation', '270 90 0');
            terraceFloor.setAttribute('position', `0 0 0`);
            terraceFloor.setAttribute('side', 'double');
            terraceFloor.setAttribute('roughness', '1');
            terraceFloor.setAttribute('static-body', '');

            let terraceGlassFrontXPosition = data.leftTerraceDepth / 2;

            let terraceGlassFront = document.createElement('a-plane');
            leftTerraceEntity.appendChild(terraceGlassFront);
            terraceGlassFront.setAttribute('class', 'glassPanes');
            terraceGlassFront.setAttribute('width', data.leftTerraceWidth);
            terraceGlassFront.setAttribute('height', '1');
            terraceGlassFront.setAttribute('opacity', '0.05');
            terraceGlassFront.setAttribute('side', 'double');
            terraceGlassFront.setAttribute('rotation', '0 90 0');
            terraceGlassFront.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 0`);
            terraceGlassFront.setAttribute('static-body', '');
    
            let terraceGlassRightAndLeftXPosition = data.leftTerraceDepth / 2;

            let terraceGlassRightAndLeftZPosition = data.leftTerraceWidth / 2

            let terraceGlassRight = document.createElement('a-plane');
            leftTerraceEntity.appendChild(terraceGlassRight);
            terraceGlassRight.setAttribute('class', 'glassPanes');
            terraceGlassRight.setAttribute('width', data.leftTerraceDepth);
            terraceGlassRight.setAttribute('height', '1');
            terraceGlassRight.setAttribute('opacity', '0.05');
            terraceGlassRight.setAttribute('side', 'double');
            terraceGlassRight.setAttribute('rotation', '0 0 0');
            terraceGlassRight.setAttribute('position', `0 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassRight.setAttribute('static-body', '');
    
            let terraceGlassLeft = document.createElement('a-plane');
            leftTerraceEntity.appendChild(terraceGlassLeft);
            terraceGlassLeft.setAttribute('class', 'glassPanes');
            terraceGlassLeft.setAttribute('width', data.leftTerraceDepth);
            terraceGlassLeft.setAttribute('height', '1');
            terraceGlassLeft.setAttribute('opacity', '0.05');
            terraceGlassLeft.setAttribute('side', 'double');
            terraceGlassLeft.setAttribute('rotation', '0 0 0');
            terraceGlassLeft.setAttribute('position', `0 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassLeft.setAttribute('static-body', '');

            if(data.width < data.leftTerraceWidth) {
                let additionalGlassPanesWidth = (data.leftTerraceWidth - data.width) / 2;

                let additionalGlassPanesZposition = data.width / 2 + additionalGlassPanesWidth / 2;

                let terraceGlassBackLeft = document.createElement('a-plane');
                leftTerraceEntity.appendChild(terraceGlassBackLeft);
                terraceGlassBackLeft.setAttribute('class', 'glassPanes');
                terraceGlassBackLeft.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackLeft.setAttribute('height', '1');
                terraceGlassBackLeft.setAttribute('opacity', '0.05');
                terraceGlassBackLeft.setAttribute('side', 'double');
                terraceGlassBackLeft.setAttribute('rotation', '0 90 0');
                terraceGlassBackLeft.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${additionalGlassPanesZposition}`);
                terraceGlassBackLeft.setAttribute('static-body', '');

                let terraceGlassBackRight = document.createElement('a-plane');
                leftTerraceEntity.appendChild(terraceGlassBackRight);
                terraceGlassBackRight.setAttribute('class', 'glassPanes');
                terraceGlassBackRight.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackRight.setAttribute('height', '1');
                terraceGlassBackRight.setAttribute('opacity', '0.05');
                terraceGlassBackRight.setAttribute('side', 'double');
                terraceGlassBackRight.setAttribute('rotation', '0 90 0');
                terraceGlassBackRight.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${additionalGlassPanesZposition}`);
                terraceGlassBackRight.setAttribute('static-body', '');
            };
    
            let terraceSeparation = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceSeparation);
            terraceSeparation.setAttribute('id', 'leftTerraceSeparation');
            terraceSeparation.setAttribute('color', 'lightgrey');
            terraceSeparation.setAttribute('scale', `0.1 0.1 ${data.leftTerraceWidth}`);
            terraceSeparation.setAttribute('position', `-${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceSeparation.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFront = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceGlassPaneMarkFront);
            terraceGlassPaneMarkFront.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFront.setAttribute('color', 'grey');
            terraceGlassPaneMarkFront.setAttribute('scale', `0.1 0.1 ${data.leftTerraceWidth}`);
            terraceGlassPaneMarkFront.setAttribute('position', `${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceGlassPaneMarkFront.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkLeft = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceGlassPaneMarkLeft);
            terraceGlassPaneMarkLeft.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkLeft.setAttribute('color', 'grey');
            terraceGlassPaneMarkLeft.setAttribute('scale', `${data.leftTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkLeft.setAttribute('position', `0 0 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkLeft.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkRight = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceGlassPaneMarkRight);
            terraceGlassPaneMarkRight.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkRight.setAttribute('color', 'grey');
            terraceGlassPaneMarkRight.setAttribute('scale', `${data.leftTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkRight.setAttribute('position', `0 0 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkRight.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontRightUp = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceGlassPaneMarkFrontRightUp);
            terraceGlassPaneMarkFrontRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontRightUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontLeftUp = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceGlassPaneMarkFrontLeftUp);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('static-body', '');

            let terraceGlassPaneMarkBackRightUp = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceGlassPaneMarkBackRightUp);
            terraceGlassPaneMarkBackRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackRightUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkBackLeftUp = document.createElement('a-box');
            leftTerraceEntity.appendChild(terraceGlassPaneMarkBackLeftUp);
            terraceGlassPaneMarkBackLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackLeftUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackLeftUp.setAttribute('static-body', '');
        };

        if(data.frontTerrace == true) {
            console.log('creating front terrace');
            let frontTerraceEntity = document.createElement('a-entity');
            frontTerraceEntity.setAttribute('id', 'frontTerraceEntity');

            el.appendChild(frontTerraceEntity);

            let frontTerraceZPosition = data.depth / 2 + data.frontTerraceDepth / 2;

            frontTerraceEntity.setAttribute('position', `0 0 -${frontTerraceZPosition}`);
            frontTerraceEntity.setAttribute('rotation', `0 90 0`);

            let terraceFloor = document.createElement('a-plane');
            frontTerraceEntity.appendChild(terraceFloor);
            terraceFloor.setAttribute('id', 'terraceFloor');
            terraceFloor.setAttribute('src', data.frontTerraceTexture);
            terraceFloor.setAttribute('repeat', data.frontTerraceTextureRepeat);
            terraceFloor.setAttribute('width', data.frontTerraceWidth);
            terraceFloor.setAttribute('height', data.frontTerraceDepth);
            terraceFloor.setAttribute('rotation', '270 90 0');
            terraceFloor.setAttribute('position', `0 0 0`);
            terraceFloor.setAttribute('side', 'double');
            terraceFloor.setAttribute('roughness', '1');
            terraceFloor.setAttribute('static-body', '');

            let terraceGlassFrontXPosition = data.frontTerraceDepth / 2;

            let terraceGlassFront = document.createElement('a-plane');
            frontTerraceEntity.appendChild(terraceGlassFront);
            terraceGlassFront.setAttribute('class', 'glassPanes');
            terraceGlassFront.setAttribute('width', data.frontTerraceWidth);
            terraceGlassFront.setAttribute('height', '1');
            terraceGlassFront.setAttribute('opacity', '0.05');
            terraceGlassFront.setAttribute('side', 'double');
            terraceGlassFront.setAttribute('rotation', '0 90 0');
            terraceGlassFront.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 0`);
            terraceGlassFront.setAttribute('static-body', '');
    
            let terraceGlassRightAndLeftXPosition = data.frontTerraceDepth / 2;

            let terraceGlassRightAndLeftZPosition = data.frontTerraceWidth / 2

            let terraceGlassRight = document.createElement('a-plane');
            frontTerraceEntity.appendChild(terraceGlassRight);
            terraceGlassRight.setAttribute('class', 'glassPanes');
            terraceGlassRight.setAttribute('width', data.frontTerraceDepth);
            terraceGlassRight.setAttribute('height', '1');
            terraceGlassRight.setAttribute('opacity', '0.05');
            terraceGlassRight.setAttribute('side', 'double');
            terraceGlassRight.setAttribute('rotation', '0 0 0');
            terraceGlassRight.setAttribute('position', `0 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassRight.setAttribute('static-body', '');
    
            let terraceGlassLeft = document.createElement('a-plane');
            frontTerraceEntity.appendChild(terraceGlassLeft);
            terraceGlassLeft.setAttribute('class', 'glassPanes');
            terraceGlassLeft.setAttribute('width', data.frontTerraceDepth);
            terraceGlassLeft.setAttribute('height', '1');
            terraceGlassLeft.setAttribute('opacity', '0.05');
            terraceGlassLeft.setAttribute('side', 'double');
            terraceGlassLeft.setAttribute('rotation', '0 0 0');
            terraceGlassLeft.setAttribute('position', `0 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassLeft.setAttribute('static-body', '');

            if(data.width < data.frontTerraceWidth) {
                let additionalGlassPanesWidth = (data.frontTerraceWidth - data.width) / 2;

                let additionalGlassPanesZposition = data.width / 2 + additionalGlassPanesWidth / 2;

                let terraceGlassBackLeft = document.createElement('a-plane');
                frontTerraceEntity.appendChild(terraceGlassBackLeft);
                terraceGlassBackLeft.setAttribute('class', 'glassPanes');
                terraceGlassBackLeft.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackLeft.setAttribute('height', '1');
                terraceGlassBackLeft.setAttribute('opacity', '0.05');
                terraceGlassBackLeft.setAttribute('side', 'double');
                terraceGlassBackLeft.setAttribute('rotation', '0 90 0');
                terraceGlassBackLeft.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${additionalGlassPanesZposition}`);
                terraceGlassBackLeft.setAttribute('static-body', '');

                let terraceGlassBackRight = document.createElement('a-plane');
                frontTerraceEntity.appendChild(terraceGlassBackRight);
                terraceGlassBackRight.setAttribute('class', 'glassPanes');
                terraceGlassBackRight.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackRight.setAttribute('height', '1');
                terraceGlassBackRight.setAttribute('opacity', '0.05');
                terraceGlassBackRight.setAttribute('side', 'double');
                terraceGlassBackRight.setAttribute('rotation', '0 90 0');
                terraceGlassBackRight.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${additionalGlassPanesZposition}`);
                terraceGlassBackRight.setAttribute('static-body', '');
            };
    
            let terraceSeparation = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceSeparation);
            terraceSeparation.setAttribute('id', 'frontTerraceSeparation');
            terraceSeparation.setAttribute('color', 'lightgrey');
            terraceSeparation.setAttribute('scale', `0.1 0.1 ${data.frontTerraceWidth}`);
            terraceSeparation.setAttribute('position', `-${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceSeparation.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFront = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceGlassPaneMarkFront);
            terraceGlassPaneMarkFront.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFront.setAttribute('color', 'grey');
            terraceGlassPaneMarkFront.setAttribute('scale', `0.1 0.1 ${data.frontTerraceWidth}`);
            terraceGlassPaneMarkFront.setAttribute('position', `${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceGlassPaneMarkFront.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkLeft = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceGlassPaneMarkLeft);
            terraceGlassPaneMarkLeft.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkLeft.setAttribute('color', 'grey');
            terraceGlassPaneMarkLeft.setAttribute('scale', `${data.frontTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkLeft.setAttribute('position', `0 0 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkLeft.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkRight = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceGlassPaneMarkRight);
            terraceGlassPaneMarkRight.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkRight.setAttribute('color', 'grey');
            terraceGlassPaneMarkRight.setAttribute('scale', `${data.frontTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkRight.setAttribute('position', `0 0 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkRight.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontRightUp = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceGlassPaneMarkFrontRightUp);
            terraceGlassPaneMarkFrontRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontRightUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontLeftUp = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceGlassPaneMarkFrontLeftUp);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('static-body', '');

            let terraceGlassPaneMarkBackRightUp = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceGlassPaneMarkBackRightUp);
            terraceGlassPaneMarkBackRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackRightUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkBackLeftUp = document.createElement('a-box');
            frontTerraceEntity.appendChild(terraceGlassPaneMarkBackLeftUp);
            terraceGlassPaneMarkBackLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackLeftUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackLeftUp.setAttribute('static-body', '');
        };

        if(data.backTerrace == true) {
            console.log('creating back terrace');
            let backTerraceEntity = document.createElement('a-entity');
            backTerraceEntity.setAttribute('id', 'backTerraceEntity');

            el.appendChild(backTerraceEntity);

            let backTerraceZPosition = data.depth / 2 + data.backTerraceDepth / 2;

            backTerraceEntity.setAttribute('position', `0 0 ${backTerraceZPosition}`);
            backTerraceEntity.setAttribute('rotation', `0 -90 0`);

            let terraceFloor = document.createElement('a-plane');
            backTerraceEntity.appendChild(terraceFloor);
            terraceFloor.setAttribute('id', 'terraceFloor');
            terraceFloor.setAttribute('src', data.backTerraceTexture);
            terraceFloor.setAttribute('repeat', data.backTerraceTextureRepeat);
            terraceFloor.setAttribute('width', data.backTerraceWidth);
            terraceFloor.setAttribute('height', data.backTerraceDepth);
            terraceFloor.setAttribute('rotation', '270 90 0');
            terraceFloor.setAttribute('position', `0 0 0`);
            terraceFloor.setAttribute('side', 'double');
            terraceFloor.setAttribute('roughness', '1');
            terraceFloor.setAttribute('static-body', '');

            let terraceGlassFrontXPosition = data.backTerraceDepth / 2;

            let terraceGlassFront = document.createElement('a-plane');
            backTerraceEntity.appendChild(terraceGlassFront);
            terraceGlassFront.setAttribute('class', 'glassPanes');
            terraceGlassFront.setAttribute('width', data.backTerraceWidth);
            terraceGlassFront.setAttribute('height', '1');
            terraceGlassFront.setAttribute('opacity', '0.05');
            terraceGlassFront.setAttribute('side', 'double');
            terraceGlassFront.setAttribute('rotation', '0 90 0');
            terraceGlassFront.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 0`);
            terraceGlassFront.setAttribute('static-body', '');
    
            let terraceGlassRightAndLeftXPosition = data.backTerraceDepth / 2;

            let terraceGlassRightAndLeftZPosition = data.backTerraceWidth / 2

            let terraceGlassRight = document.createElement('a-plane');
            backTerraceEntity.appendChild(terraceGlassRight);
            terraceGlassRight.setAttribute('class', 'glassPanes');
            terraceGlassRight.setAttribute('width', data.backTerraceDepth);
            terraceGlassRight.setAttribute('height', '1');
            terraceGlassRight.setAttribute('opacity', '0.05');
            terraceGlassRight.setAttribute('side', 'double');
            terraceGlassRight.setAttribute('rotation', '0 0 0');
            terraceGlassRight.setAttribute('position', `0 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassRight.setAttribute('static-body', '');
    
            let terraceGlassLeft = document.createElement('a-plane');
            backTerraceEntity.appendChild(terraceGlassLeft);
            terraceGlassLeft.setAttribute('class', 'glassPanes');
            terraceGlassLeft.setAttribute('width', data.backTerraceDepth);
            terraceGlassLeft.setAttribute('height', '1');
            terraceGlassLeft.setAttribute('opacity', '0.05');
            terraceGlassLeft.setAttribute('side', 'double');
            terraceGlassLeft.setAttribute('rotation', '0 0 0');
            terraceGlassLeft.setAttribute('position', `0 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassLeft.setAttribute('static-body', '');

            if(data.width < data.backTerraceWidth) {
                let additionalGlassPanesWidth = (data.backTerraceWidth - data.width) / 2;

                let additionalGlassPanesZposition = data.width / 2 + additionalGlassPanesWidth / 2;

                let terraceGlassBackLeft = document.createElement('a-plane');
                backTerraceEntity.appendChild(terraceGlassBackLeft);
                terraceGlassBackLeft.setAttribute('class', 'glassPanes');
                terraceGlassBackLeft.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackLeft.setAttribute('height', '1');
                terraceGlassBackLeft.setAttribute('opacity', '0.05');
                terraceGlassBackLeft.setAttribute('side', 'double');
                terraceGlassBackLeft.setAttribute('rotation', '0 90 0');
                terraceGlassBackLeft.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${additionalGlassPanesZposition}`);
                terraceGlassBackLeft.setAttribute('static-body', '');

                let terraceGlassBackRight = document.createElement('a-plane');
                backTerraceEntity.appendChild(terraceGlassBackRight);
                terraceGlassBackRight.setAttribute('class', 'glassPanes');
                terraceGlassBackRight.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackRight.setAttribute('height', '1');
                terraceGlassBackRight.setAttribute('opacity', '0.05');
                terraceGlassBackRight.setAttribute('side', 'double');
                terraceGlassBackRight.setAttribute('rotation', '0 90 0');
                terraceGlassBackRight.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${additionalGlassPanesZposition}`);
                terraceGlassBackRight.setAttribute('static-body', '');
            };
    
            let terraceSeparation = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceSeparation);
            terraceSeparation.setAttribute('id', 'backTerraceSeparation');
            terraceSeparation.setAttribute('color', 'lightgrey');
            terraceSeparation.setAttribute('scale', `0.1 0.1 ${data.backTerraceWidth}`);
            terraceSeparation.setAttribute('position', `-${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceSeparation.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFront = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceGlassPaneMarkFront);
            terraceGlassPaneMarkFront.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFront.setAttribute('color', 'grey');
            terraceGlassPaneMarkFront.setAttribute('scale', `0.1 0.1 ${data.backTerraceWidth}`);
            terraceGlassPaneMarkFront.setAttribute('position', `${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceGlassPaneMarkFront.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkLeft = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceGlassPaneMarkLeft);
            terraceGlassPaneMarkLeft.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkLeft.setAttribute('color', 'grey');
            terraceGlassPaneMarkLeft.setAttribute('scale', `${data.backTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkLeft.setAttribute('position', `0 0 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkLeft.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkRight = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceGlassPaneMarkRight);
            terraceGlassPaneMarkRight.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkRight.setAttribute('color', 'grey');
            terraceGlassPaneMarkRight.setAttribute('scale', `${data.backTerraceDepth} 0.1 0.1`);
            terraceGlassPaneMarkRight.setAttribute('position', `0 0 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkRight.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontRightUp = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceGlassPaneMarkFrontRightUp);
            terraceGlassPaneMarkFrontRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontRightUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontLeftUp = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceGlassPaneMarkFrontLeftUp);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('static-body', '');

            let terraceGlassPaneMarkBackRightUp = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceGlassPaneMarkBackRightUp);
            terraceGlassPaneMarkBackRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackRightUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkBackLeftUp = document.createElement('a-box');
            backTerraceEntity.appendChild(terraceGlassPaneMarkBackLeftUp);
            terraceGlassPaneMarkBackLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackLeftUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackLeftUp.setAttribute('static-body', '');
        };
    }
});