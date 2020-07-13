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

        podium.setAttribute('shadow', 'cast: true');
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

                    roomLight.removeAttribute('light');

                    roomLight.setAttribute('light', 'type: point; color: #FDB813; shadowMapWidth: 5120; shadowMapHeight: 5120; shadowCameraNear: 5; shadowCameraFar: 200; distance: 200; castShadow: true; intensity: 1; shadowCameraVisible: true;');
                    roomLight.setAttribute('position', '100 35 2.5');

                    time = 'day';
                } else {
                    sky.setAttribute('src', '#nightSky');

                    sky.setAttribute('scale', '0.2 0.2 0.2');

                    roomLight.removeAttribute('light');

                    roomLight.setAttribute('light', 'type: point; color: lightblue; castShadow: true; intensity: 0.3; distance: 25; shadowMapHeight: 3000; shadowMapWidth: 3000; shadowCameraVisible: false; shadowCameraFar: 1000;');
                    roomLight.setAttribute('position', '0 8.5 0');

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

        wallsDepth: {type: 'number', default: 0.3},
        frontWall: {type: 'boolean', default: true},
        backWall: {type: 'boolean', default: true},
        rightWall: {type: 'boolean', default: true},
        leftWall: {type: 'boolean', default: true},
        
        ceiling: {type: 'boolean', default: true},

        wallColor: {type: 'color', default: 'lightgrey'},
        wallTexture: {type: 'string'},
        wallTextureRepeat: {type: 'string'},

        floorColor: {type: 'color'},
        floorTexture: {type: 'string'},
        floorTextureRepeat: {type: 'string'},

        terraceMerge: {type: 'boolean', default: true},

        frontTerrace: {type: 'boolean', default: false},
        frontTerraceWidth: {type: 'number', default: 30},
        frontTerraceDepth: {type: 'number', default: 8},
        frontTerraceColor: {type: 'color'},
        frontTerraceTexture: {type: 'string'},
        frontTerraceTextureRepeat: {type: 'string'},

        backTerrace: {type: 'boolean', default: false},
        backTerraceWidth: {type: 'number', default: 30},
        backTerraceDepth: {type: 'number', default: 8},
        backTerraceColor: {type: 'color'},
        backTerraceTexture: {type: 'string'},
        backTerraceTextureRepeat: {type: 'string'},

        rightTerrace: {type: 'boolean', default: false},
        rightTerraceWidth: {type: 'number', default: 30},
        rightTerraceDepth: {type: 'number', default: 8},
        rightTerraceColor: {type: 'color'},
        rightTerraceTexture: {type: 'string'},
        rightTerraceTextureRepeat: {type: 'string'},

        leftTerrace: {type: 'boolean', default: false},
        leftTerraceWidth: {type: 'number', default: 30},
        leftTerraceDepth: {type: 'number', default: 8},
        leftTerraceColor: {type: 'color'},
        leftTerraceTexture: {type: 'string'},
        leftTerraceTextureRepeat: {type: 'string'},
    },

    init: function() {
        let data = this.data;
        let el = this.el;  

        let frontTerraceXPosition = 0;
        let frontTerraceZPosition = -(data.depth / 2 + data.frontTerraceDepth / 2);
        let frontTerraceWidth = data.frontTerraceWidth;
        let frontTerraceDepth = data.frontTerraceDepth;
        let frontTerraceColor = data.frontTerraceColor;
        let frontTerraceTexture = data.frontTerraceTexture;
        let frontTerraceTextureRepeat = data.frontTerraceTextureRepeat;


        let backTerraceXPosition = 0;
        let backTerraceZPosition = data.depth / 2 + data.backTerraceDepth / 2;
        let backTerraceWidth = data.backTerraceWidth;
        let backTerraceDepth = data.backTerraceDepth;
        let backTerraceColor = data.backTerraceColor;
        let backTerraceTexture = data.backTerraceTexture;
        let backTerraceTextureRepeat = data.backTerraceTextureRepeat;

    
        let rightTerraceXPosition = data.width / 2 + data.rightTerraceDepth / 2;
        let rightTerraceZPosition = 0;
        let rightTerraceWidth = data.rightTerraceWidth;
        let rightTerraceDepth = data.rightTerraceDepth;
        let rightTerraceColor = data.rightTerraceColor;
        let rightTerraceTexture = data.rightTerraceTexture;
        let rightTerraceTextureRepeat = data.rightTerraceTextureRepeat;


        let leftTerraceXPosition = -(data.width / 2 + data.leftTerraceDepth / 2);
        let leftTerraceZPosition = 0;
        let leftTerraceWidth = data.leftTerraceWidth;
        let leftTerraceDepth = data.leftTerraceDepth;
        let leftTerraceColor = data.leftTerraceColor;
        let leftTerraceTexture = data.leftTerraceTexture;
        let leftTerraceTextureRepeat = data.leftTerraceTextureRepeat;


        var terraceDiferenceF_R = data.width / 2 + rightTerraceDepth - frontTerraceWidth / 2;
        var terraceDiferenceF_L = data.width / 2 + leftTerraceDepth - frontTerraceWidth / 2;

        var terraceDiferenceB_R = data.width / 2 + rightTerraceDepth - backTerraceWidth / 2;
        var terraceDiferenceB_L = data.width / 2 + leftTerraceDepth - backTerraceWidth / 2;

        var terraceDiferenceR_F = data.depth / 2 + frontTerraceDepth - rightTerraceWidth / 2;
        var terraceDiferenceR_B = data.depth / 2 + backTerraceDepth - rightTerraceWidth / 2;

        var terraceDiferenceL_F = data.depth / 2 + frontTerraceDepth - leftTerraceWidth / 2;
        var terraceDiferenceL_B = data.depth / 2 + backTerraceDepth - leftTerraceWidth / 2;


        let terraceMerger = function() {
            console.log('executing merge ...');
            console.log(el);

            if(frontTerraceWidth >= rightTerraceWidth) {
                frontTerraceWidth = frontTerraceWidth + terraceDiferenceF_R;
                console.log('frontTerraceWidth is ', frontTerraceWidth);

                frontTerraceXPosition = frontTerraceXPosition + terraceDiferenceF_R / 2;
                console.log('front terrace X position is ', frontTerraceXPosition);
            };

            if(frontTerraceWidth >= leftTerraceWidth) {
                frontTerraceWidth = frontTerraceWidth + terraceDiferenceF_L;
                console.log('frontTerraceWidth is ', frontTerraceWidth);

                frontTerraceXPosition = frontTerraceXPosition - terraceDiferenceF_L / 2;
                console.log('front terrace X position is ', frontTerraceXPosition);
            };

            if(backTerraceWidth >= rightTerraceWidth) {
                backTerraceWidth = backTerraceWidth + terraceDiferenceB_R;
                console.log('backTerraceWidth is ', backTerraceWidth);

                backTerraceXPosition = backTerraceXPosition + terraceDiferenceB_R / 2;
                console.log('back terrace X position is ', backTerraceXPosition);
            };

            if(backTerraceWidth >= leftTerraceWidth) {
                backTerraceWidth = backTerraceWidth + terraceDiferenceB_L;
                console.log('backTerraceWidth is ', backTerraceWidth);

                backTerraceXPosition = backTerraceXPosition - terraceDiferenceB_L / 2;
                console.log('back terrace X position is ', backTerraceXPosition);
            };

            if(rightTerraceWidth > frontTerraceWidth) {
                rightTerraceWidth = rightTerraceWidth + terraceDiferenceR_F;
                console.log('rightTerraceWidth is', rightTerraceWidth);

                rightTerraceZPosition = rightTerraceZPosition - terraceDiferenceR_F / 2;
                console.log('right terrace Z position is ', rightTerraceZPosition);
            };

            if(rightTerraceWidth > backTerraceWidth) {
                rightTerraceWidth = rightTerraceWidth + terraceDiferenceR_B;
                console.log('rightTerraceWidth is', rightTerraceWidth);

                rightTerraceZPosition = rightTerraceZPosition + terraceDiferenceR_B / 2;
                console.log('right terrace Z position is ', rightTerraceZPosition);
            };

            if(leftTerraceWidth > frontTerraceWidth) {
                leftTerraceWidth = leftTerraceWidth + terraceDiferenceL_F;
                console.log('leftTerraceWidth is', leftTerraceWidth);

                leftTerraceZPosition = leftTerraceZPosition - terraceDiferenceL_F / 2;
                console.log('left terrace Z position is ', leftTerraceZPosition);
            };

            if(leftTerraceWidth > backTerraceWidth) {
                leftTerraceWidth = leftTerraceWidth + terraceDiferenceL_B;
                console.log('leftTerraceWidth is', leftTerraceWidth);

                leftTerraceZPosition = leftTerraceZPosition + terraceDiferenceL_B / 2;
                console.log('left terrace Z position is ', leftTerraceZPosition);
            };
        };


        if(data.sky == true) {
            let sky = document.createElement('a-sky');
            el.appendChild(sky);
            sky.setAttribute('id', 'sky');
            sky.setAttribute('color', data.color);
            sky.setAttribute('src', data.skyTexture);
            sky.setAttribute('rotation', '0 280 0');
            sky.setAttribute('opacity', '1');
            sky.setAttribute('scale', '1 1 1');
        };

        let roomFloor = document.createElement('a-plane');
        el.appendChild(roomFloor);
        roomFloor.setAttribute('class', 'roomFloor');
        roomFloor.setAttribute('src', data.floorTexture);
        roomFloor.setAttribute('repet', data.floorTextureRepeat);
        roomFloor.setAttribute('color', data.floorColor);
        roomFloor.setAttribute('roughness', '0.45');
        roomFloor.setAttribute('position', '0 0 0');
        roomFloor.setAttribute('width', data.width);
        roomFloor.setAttribute('height', data.depth);
        roomFloor.setAttribute('rotation', '270 0 0');
        roomFloor.setAttribute('side', 'double');
        roomFloor.setAttribute('static-body', '');
        roomFloor.setAttribute('shadow', 'receive: true');

        let wallsPositionY = data.height / 2;

        if(data.leftWall == true) {
            let leftWall = document.createElement('a-box');
            let leftWallPositionX = data.depth / 2;
            el.appendChild(leftWall);
            leftWall.setAttribute('class', 'walls');
            leftWall.setAttribute('src', data.wallTexture);
            leftWall.setAttribute('repeat', data.wallTextureRepeat);
            leftWall.setAttribute('position', `-${leftWallPositionX} ${wallsPositionY} 0`);
            leftWall.setAttribute('width', data.width);
            leftWall.setAttribute('height', data.height);
            leftWall.setAttribute('depth', '0.3');
            leftWall.setAttribute('rotation', '0 90 0');
            leftWall.setAttribute('shadow', 'cast: true');
            leftWall.setAttribute('static-body', '');
        };

        if(data.rightWall == true) {
            let rightWall = document.createElement('a-box');
            let rightWallPositionX = data.depth / 2;
            el.appendChild(rightWall);
            rightWall.setAttribute('class', 'walls');
            rightWall.setAttribute('src', data.wallTexture);
            rightWall.setAttribute('repeat', data.wallTextureRepeat);
            rightWall.setAttribute('position', `${rightWallPositionX} ${wallsPositionY} 0`);
            rightWall.setAttribute('width', data.width);
            rightWall.setAttribute('height', data.height);
            rightWall.setAttribute('depth', '0.3');
            rightWall.setAttribute('rotation', '0 90 0');
            rightWall.setAttribute('shadow', 'cast: true');
            rightWall.setAttribute('static-body', '');
        };

        if(data.frontWall == true) {
            let frontWall = document.createElement('a-box');
            let frontWallpositionZ = data.width / 2
            el.appendChild(frontWall);
            frontWall.setAttribute('class', 'walls');
            frontWall.setAttribute('src', data.wallTexture);
            frontWall.setAttribute('repeat', data.wallTextureRepeat);
            frontWall.setAttribute('position', `0 ${wallsPositionY} -${frontWallpositionZ}`);
            frontWall.setAttribute('width', data.depth);
            frontWall.setAttribute('height', data.height);
            frontWall.setAttribute('depth', '0.3');
            frontWall.setAttribute('rotation', '0 0 0');
            frontWall.setAttribute('shadow', 'cast: true');
            frontWall.setAttribute('static-body', '');
        };

        if(data.backWall == true) {
            let backWall = document.createElement('a-box');
            let backWallpositionZ = data.width / 2
            el.appendChild(backWall);
            backWall.setAttribute('class', 'walls');
            backWall.setAttribute('src', data.wallTexture);
            backWall.setAttribute('repeat', data.wallTextureRepeat);
            backWall.setAttribute('position', `0 ${wallsPositionY} ${backWallpositionZ}`);
            backWall.setAttribute('width', data.depth);
            backWall.setAttribute('height', data.height);
            backWall.setAttribute('depth', '0.3');
            backWall.setAttribute('rotation', '0 0 0');
            backWall.setAttribute('shadow', 'cast: true');
            backWall.setAttribute('static-body', '');
        };

        if(data.ceiling == true) {
            let ceiling = document.createElement('a-box');
            el.appendChild(ceiling);
            ceiling.setAttribute('class', 'ceiling');
            ceiling.setAttribute('position', `0 ${data.height} 0`);
            ceiling.setAttribute('width', data.width + data.wallsDepth / 2);
            ceiling.setAttribute('height', data.depth + data.wallsDepth);
            ceiling.setAttribute('depth', '0.3');
            ceiling.setAttribute('rotation', '90 0 0');
            ceiling.setAttribute('shadow', 'cast: true');
            ceiling.setAttribute('static-body', '');
        };

        //let roomLight = document.createElement('a-entity');
        //el.appendChild(roomLight);
        //roomLight.setAttribute('id', 'roomLight');
        //roomLight.setAttribute('light', 'type: point; color: lightblue; castShadow: true; intensity: 0.3; distance: 25; shadowMapHeight: 3000; shadowMapWidth: 3000; shadowCameraVisible: true; shadowCameraFar: 1000;');
        //roomLight.setAttribute('position', '0 8.5 0');


        if(data.terraceMerge == true) {
            terraceMerger();
        };

        let terraceCreator = function(id, Xposition, Zposition, rotation, width, depth, color, texture, textureRepeat) {            
            let terrace = document.createElement('a-entity');
            el.appendChild(terrace);
            terrace.setAttribute('id', id);
            terrace.setAttribute('position', `${Xposition} 0 ${Zposition}`);
            terrace.setAttribute('rotation', `0 ${rotation} 0`);

            let terraceFloor = document.createElement('a-plane');
            terrace.appendChild(terraceFloor);
            terraceFloor.setAttribute('id', 'terraceFloor');
            terraceFloor.setAttribute('src', texture); 
            terraceFloor.setAttribute('color', color);
            terraceFloor.setAttribute('repeat', textureRepeat);
            terraceFloor.setAttribute('width', width);
            terraceFloor.setAttribute('height', depth);
            terraceFloor.setAttribute('rotation', '270 90 0');
            terraceFloor.setAttribute('position', `0 0 0`);
            terraceFloor.setAttribute('side', 'double');
            terraceFloor.setAttribute('roughness', '1');
            terraceFloor.setAttribute('static-body', '');
            terraceFloor.setAttribute('shadow', 'receive: true');

            let terraceGlassFrontXPosition = depth / 2;

            let terraceGlassFront = document.createElement('a-plane');
            terrace.appendChild(terraceGlassFront);
            terraceGlassFront.setAttribute('class', 'glassPanes');
            terraceGlassFront.setAttribute('width', width);
            terraceGlassFront.setAttribute('height', '1');
            terraceGlassFront.setAttribute('opacity', '0.05');
            terraceGlassFront.setAttribute('side', 'double');
            terraceGlassFront.setAttribute('rotation', '0 90 0');
            terraceGlassFront.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 0`);
            terraceGlassFront.setAttribute('static-body', '');
    
            let terraceGlassRightAndLeftXPosition = depth / 2;

            let terraceGlassRightAndLeftZPosition = width / 2

            let terraceGlassRight = document.createElement('a-plane');
            terrace.appendChild(terraceGlassRight);
            terraceGlassRight.setAttribute('class', 'glassPanes');
            terraceGlassRight.setAttribute('width', depth);
            terraceGlassRight.setAttribute('height', '1');
            terraceGlassRight.setAttribute('opacity', '0.05');
            terraceGlassRight.setAttribute('side', 'double');
            terraceGlassRight.setAttribute('rotation', '0 0 0');
            terraceGlassRight.setAttribute('position', `0 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassRight.setAttribute('static-body', '');
    
            let terraceGlassLeft = document.createElement('a-plane');
            terrace.appendChild(terraceGlassLeft);
            terraceGlassLeft.setAttribute('class', 'glassPanes');
            terraceGlassLeft.setAttribute('width', depth);
            terraceGlassLeft.setAttribute('height', '1');
            terraceGlassLeft.setAttribute('opacity', '0.05');
            terraceGlassLeft.setAttribute('side', 'double');
            terraceGlassLeft.setAttribute('rotation', '0 0 0');
            terraceGlassLeft.setAttribute('position', `0 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassLeft.setAttribute('static-body', '');

            if(data.width < width) {
                let additionalGlassPanesWidth = (width - data.width) / 2;

                let additionalGlassPanesZposition = data.width / 2 + additionalGlassPanesWidth / 2;

                let terraceGlassBackLeft = document.createElement('a-plane');
                terrace.appendChild(terraceGlassBackLeft);
                terraceGlassBackLeft.setAttribute('class', 'glassPanes');
                terraceGlassBackLeft.setAttribute('width', `${additionalGlassPanesWidth}`);
                terraceGlassBackLeft.setAttribute('height', '1');
                terraceGlassBackLeft.setAttribute('opacity', '0.05');
                terraceGlassBackLeft.setAttribute('side', 'double');
                terraceGlassBackLeft.setAttribute('rotation', '0 90 0');
                terraceGlassBackLeft.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${additionalGlassPanesZposition}`);
                terraceGlassBackLeft.setAttribute('static-body', '');

                let terraceGlassBackRight = document.createElement('a-plane');
                terrace.appendChild(terraceGlassBackRight);
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
            terrace.appendChild(terraceSeparation);
            terraceSeparation.setAttribute('class', 'terraceSeparation');
            terraceSeparation.setAttribute('color', 'lightgrey');
            terraceSeparation.setAttribute('scale', `0.1 0.1 ${width}`);
            terraceSeparation.setAttribute('position', `-${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceSeparation.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFront = document.createElement('a-box');
            terrace.appendChild(terraceGlassPaneMarkFront);
            terraceGlassPaneMarkFront.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFront.setAttribute('color', 'grey');
            terraceGlassPaneMarkFront.setAttribute('scale', `0.1 0.1 ${width}`);
            terraceGlassPaneMarkFront.setAttribute('position', `${terraceGlassRightAndLeftXPosition} 0 0`);
            terraceGlassPaneMarkFront.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkLeft = document.createElement('a-box');
            terrace.appendChild(terraceGlassPaneMarkLeft);
            terraceGlassPaneMarkLeft.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkLeft.setAttribute('color', 'grey');
            terraceGlassPaneMarkLeft.setAttribute('scale', `${depth} 0.1 0.1`);
            terraceGlassPaneMarkLeft.setAttribute('position', `0 0 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkLeft.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkRight = document.createElement('a-box');
            terrace.appendChild(terraceGlassPaneMarkRight);
            terraceGlassPaneMarkRight.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkRight.setAttribute('color', 'grey');
            terraceGlassPaneMarkRight.setAttribute('scale', `${depth} 0.1 0.1`);
            terraceGlassPaneMarkRight.setAttribute('position', `0 0 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkRight.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontRightUp = document.createElement('a-box');
            terrace.appendChild(terraceGlassPaneMarkFrontRightUp);
            terraceGlassPaneMarkFrontRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontRightUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkFrontLeftUp = document.createElement('a-box');
            terrace.appendChild(terraceGlassPaneMarkFrontLeftUp);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkFrontLeftUp.setAttribute('position', `${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkFrontLeftUp.setAttribute('static-body', '');

            let terraceGlassPaneMarkBackRightUp = document.createElement('a-box');
            terrace.appendChild(terraceGlassPaneMarkBackRightUp);
            terraceGlassPaneMarkBackRightUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackRightUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackRightUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackRightUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackRightUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 ${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackRightUp.setAttribute('static-body', '');
    
            let terraceGlassPaneMarkBackLeftUp = document.createElement('a-box');
            terrace.appendChild(terraceGlassPaneMarkBackLeftUp);
            terraceGlassPaneMarkBackLeftUp.setAttribute('class', 'glassPaneMarks');
            terraceGlassPaneMarkBackLeftUp.setAttribute('color', 'grey');
            terraceGlassPaneMarkBackLeftUp.setAttribute('scale', '0.03 1 0.03');
            terraceGlassPaneMarkBackLeftUp.setAttribute('opacity', '0.75');
            terraceGlassPaneMarkBackLeftUp.setAttribute('position', `-${terraceGlassFrontXPosition} 0.5 -${terraceGlassRightAndLeftZPosition}`);
            terraceGlassPaneMarkBackLeftUp.setAttribute('static-body', '');

            return terrace;
        };


        if(data.frontTerrace == true) {
            var frontTerraceEntity = terraceCreator('frontTerraceEntity', frontTerraceXPosition, frontTerraceZPosition, 90, frontTerraceWidth, frontTerraceDepth, frontTerraceColor, frontTerraceTexture, frontTerraceTextureRepeat);
        };


        if(data.backTerrace == true) {
            var backTerraceEntity = terraceCreator('backTerraceEntity', backTerraceXPosition, backTerraceZPosition, -90, backTerraceWidth, backTerraceDepth, backTerraceColor, backTerraceTexture, backTerraceTextureRepeat);
        };


        if(data.rightTerrace == true) {
            var rightTerraceEntity = terraceCreator('rightTerraceEntity', rightTerraceXPosition, rightTerraceZPosition, 0, rightTerraceWidth, rightTerraceDepth, rightTerraceColor, rightTerraceTexture, rightTerraceTextureRepeat);
        };


        if(data.leftTerrace == true) {
            var leftTerraceEntity = terraceCreator('leftTerraceEntity', leftTerraceXPosition, leftTerraceZPosition, 180, leftTerraceWidth, leftTerraceDepth, leftTerraceColor, leftTerraceTexture, leftTerraceTextureRepeat);
        };
    }
});