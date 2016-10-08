/**
 * Created by 磊 on 2016/9/19.
 */
window.onload = function () {
    p.draw();
}
function Pie(config) {
    this.title = config.title;
    this.data = config.data;
    this.target = config.target;
    this.width = config.width || 600;
    this.height = config.height || 400;
    //this.colors = 'crimson,cyan,darkblue,darkcyan,darkgoldenrod,darkgray,darkgreen,darkgrey,darkkhaki,darkmagenta'.split(',')
    this.colors = '#16A085,#27AE60,#2980B9,#8E44AD,#2C3E50,#F1C40F,#E67E22,#E74C3C,#ECF0F1,#95A5A6'.split(',')
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.context = this.canvas.getContext('2d');

}
Pie.prototype = {
    construct: Pie,
    draw: function() {
        this.drawTitle();
        this.drawPie();
        document.querySelector(this.target).appendChild(this.canvas);
    },
    drawTitle: function() {
        this.context.font = '24px 宋体';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText(this.title, this.width / 2, 20);
    },
    drawPie: function(animate) {
        var self = this,
            legendWidth,
            renderData,
            total = 0;
        renderData = this.data.map(function(d, i) {
            total += d.value;
            d.color = self.colors[i];
            return d;
        });
        var x0,
            y0;
        legendWidth = 0;
        x0 = (this.width - legendWidth) / 2;
        y0 = (this.height + 40) / 2;
        var startAngle = -Math.PI / 2,
            radius = (x0 + y0) / 4,
            lineLength = 32,
            lineMargin = 20;
        var timer, step = 5 * Math.PI / 180;
        renderData.forEach(function(d) {
            var renderAngle = 2 * Math.PI * d.value / total;
            var x1, y1, textAlign;

            self.context.beginPath();
            self.context.fillStyle = d.color;
            self.context.moveTo(x0, y0);
            self.context.arc(x0, y0, radius, startAngle, startAngle + renderAngle);
            self.context.closePath();
            self.context.fill();

            x1 = x0 + (radius + lineLength) * Math.cos(startAngle + renderAngle / 2);
            y1 = y0 + (radius + lineLength) * Math.sin(startAngle + renderAngle / 2);
            self.context.beginPath();
            self.context.strokeStyle = d.color;
            self.context.moveTo(x0, y0);
            self.context.lineTo(x1, y1);
            if (startAngle + renderAngle / 2 > Math.PI / 2) {
                x1 = x1 - lineMargin;
                textAlign = 'right';
            } else {
                x1 = x1 + lineMargin;
                textAlign = 'left';
            }
            self.context.lineTo(x1, y1);
            self.context.stroke();

            self.context.font = '14px 宋体';
            self.context.textAlign = textAlign;
            self.context.textBaseline = 'middle';
            self.context.fillText(d.name + ': ' + Math.floor(100 * d.value / total) + '%', x1, y1);

            startAngle += renderAngle;
        });
    }
};
var p = new Pie({
    title: '个人能力饼图',
    target: '#chart',
    data: [{
        name: 'HTML精通',
        value: 10
    }, {
        name: 'CSS精通',
        value: 10
    }, {
        name: 'JS基本清楚',
        value: 5
    }, {
        name: 'C3,H5基本清楚',
        value: 8,
    }, {
        name: 'CANVAS熟练',
        value: 8
    }]
});
