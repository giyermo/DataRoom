AFRAME.registerComponent('info-podium', {
    schema: {
        chartType: {type: 'string', default: ''},
    },

    init: function() {
        let data = this.data;
        let el = this.el;  

        let scene = document.getElementById(scene);

        let podium = document.createElement('a-box');

        let chart = document.createElement('a-entity');

        scene.appendChild(podium);

        podium.setAttribute('scale', {x: 5.5, y: 1, z: 5.5});
        
        scene.appendChild(chart);

        chart.setAttribute();
    }
});