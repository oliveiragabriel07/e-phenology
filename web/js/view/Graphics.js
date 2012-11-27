EP.view.Graphics = EP.view.AbstractPage.extend({
    title: 'Gráficos',
    
    template: [
        '<div class="chart-wrapper">',
            '<div class="chart-section">',
                '<p class="title">Fenofase</p>',
                '<p class="subtitle">Porcentagem de indivíduos pelo tempo</p>',
            '</div>',
            
            '<a href="#graphics/phenophase"><img class="chart phenophase-chart" src="' + EP.BLANK_IMAGE + '"/></a>',
        '</div>',
        
        '<div class="chart-wrapper">',
            '<div class="chart-section">',
                '<p class="title">Clima</p>',
                '<p class="subtitle">Precipitação x Temperatura</p>',
            '</div>',
            
            '<a href="#graphics/climate"><img class="chart climate-chart" src="' + EP.BLANK_IMAGE + '" /></a>',
        '</div>'
    ].join(''),
    
    render: function() {
        EP.view.AbstractPage.prototype.render.apply(this, arguments);
        
        this.$body.html(this.template);
        return this;
    }    
});

EP.view.ClimateGraphic = EP.view.AbstractPage.extend({
    title: '<span class="crumb-small"><a href="#graphics">Gráficos</a> > </span>Clima',
    
    render: function() {
        EP.view.AbstractPage.prototype.render.apply(this, arguments);
        var self = this;
        
        setTimeout(function() {
            self.buildChart();
        }, 100);
        return this;
    },
    
    buildChart: function() {
        var chart = new Highcharts.Chart({
            chart : {
                height: 500,
                renderTo : this.$body[0]
            },
            title : {
                text : 'Clima médio mensal'
            },
            subtitle : {
                text : 'Source: WorldClimate.com'
            },
            xAxis : [{
                categories : ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
            }],
            yAxis : [{// Primary yAxis
                labels : {
                    formatter : function() {
                        return this.value + '°C';
                    },
                    style : {
                        color : '#89A54E'
                    }
                },
                title : {
                    text : 'Temperatura',
                    style : {
                        color : '#89A54E'
                    }
                },
                opposite : true
        
            }, {// Secondary yAxis
                gridLineWidth : 0,
                title : {
                    text : 'Precipitação',
                    style : {
                        color : '#4572A7'
                    }
                },
                labels : {
                    formatter : function() {
                        return this.value + ' mm';
                    },
                    style : {
                        color : '#4572A7'
                    }
                }
        
            }],
            tooltip : {
                formatter : function() {
                    var unit = {
                    'Precipitação': 'mm',
                    'Temperatura': '°C',
                    }[this.series.name];
        
                    return '' + this.x + ': ' + this.y + ' ' + unit;
                }
            },
            legend : {
                layout : 'vertical',
                align : 'left',
                x : 120,
                verticalAlign : 'top',
                y : 80,
                floating : true,
                backgroundColor : '#FFFFFF'
            },
            series : [{
                name : 'Precipitação',
                color : '#4572A7',
                type : 'column',
                yAxis : 1,
                data : [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name : 'Temperatura',
                color : '#89A54E',
                type : 'spline',
                data : [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }]
        });
    }
});

EP.view.PhenophaseGraphic = EP.view.AbstractPage.extend({
    title: '<span class="crumb-small"><a href="#graphics">Gráficos</a> > </span>Fenofase',
    
    render: function() {
        EP.view.AbstractPage.prototype.render.apply(this, arguments);
        var self = this;
        
        setTimeout(function() {
            self.buildChart();
        }, 100);
        return this;
    },
    
    buildChart: function() {
        var chart = new Highcharts.Chart({
            chart : {
                renderTo : this.$body[0],
                height: 500,
                type : 'line'
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle',
                itemStyle: {
                    paddingBottom: '10px'
                }
            },
            credits: {
                enabled: false
            },
            title : {
                text : 'Fenofase'
            },
            xAxis : {
                type: 'datetime'
            },
            yAxis : {
                title : {
                    text : 'Porcentagem de inidivíduos'
                }
            },
            series : [{
                name : 'Botão',
                data : [[Date.UTC(2006, 1, 1), 20],[Date.UTC(2006, 2, 1), 15],[Date.UTC(2006, 3, 1), 11],
                        [Date.UTC(2006, 4, 1), 5],[Date.UTC(2006, 5, 1), 4],[Date.UTC(2006, 6, 1), 6],[Date.UTC(2006, 7, 1), 10],
                        [Date.UTC(2006, 8, 1), 20],[Date.UTC(2006, 9, 1), 20],[Date.UTC(2006, 10, 1), 22],[Date.UTC(2006, 11, 1), 30],
                        [Date.UTC(2006, 12, 1), 38],[Date.UTC(2006, 13, 1), 40],[Date.UTC(2006, 14, 1), 29],[Date.UTC(2006, 15, 1), 18]]
            }, {
                name : 'Antese',
                data : [[Date.UTC(2006, 1, 1), 1],[Date.UTC(2006, 2, 1), 10],[Date.UTC(2006, 3, 1), 20],[Date.UTC(2006, 4, 1), 23],
                        [Date.UTC(2006, 5, 1), 32],[Date.UTC(2006, 6, 1), 38],[Date.UTC(2006, 7, 1), 41],[Date.UTC(2006, 8, 1), 37],
                        [Date.UTC(2006, 9, 1), 29],[Date.UTC(2006, 10, 1), 24],[Date.UTC(2006, 11, 1), 18],[Date.UTC(2006, 12, 1), 10],
                        [Date.UTC(2006, 13, 1), 16],[Date.UTC(2006, 14, 1), 25],[Date.UTC(2006, 15, 1), 30]]
            },{
                name : 'Maduro',
                data : [[Date.UTC(2006, 1, 1), 2],[Date.UTC(2006, 2, 1), 18],[Date.UTC(2006, 3, 1), 35],[Date.UTC(2006, 4, 1), 46],
                        [Date.UTC(2006, 5, 1), 55],[Date.UTC(2006, 6, 1), 61],[Date.UTC(2006, 7, 1), 58],[Date.UTC(2006, 8, 1), 27],
                        [Date.UTC(2006, 9, 1), 20],[Date.UTC(2006, 10, 1), 17],[Date.UTC(2006, 11, 1), 11],[Date.UTC(2006, 12, 1), 8],
                        [Date.UTC(2006, 13, 1), 7],[Date.UTC(2006, 14, 1), 10],[Date.UTC(2006, 15, 1), 14]]
            }, {
                name : 'Imaturo',
                data : [[Date.UTC(2006, 1, 1), 15],[Date.UTC(2006, 2, 1), 12],[Date.UTC(2006, 3, 1), 7],[Date.UTC(2006, 4, 1), 7],
                        [Date.UTC(2006, 5, 1), 5],[Date.UTC(2006, 6, 1), 4],[Date.UTC(2006, 7, 1), 6],[Date.UTC(2006, 8, 1), 12],
                        [Date.UTC(2006, 9, 1), 26],[Date.UTC(2006, 10, 1), 30],[Date.UTC(2006, 11, 1), 40],[Date.UTC(2006, 12, 1), 42],
                        [Date.UTC(2006, 13, 1), 48],[Date.UTC(2006, 14, 1), 45],[Date.UTC(2006, 15, 1), 39]]
            },{
                name : 'Brotamento',
                data : [[Date.UTC(2006, 1, 1), 30],[Date.UTC(2006, 2, 1), 31],[Date.UTC(2006, 3, 1), 37],[Date.UTC(2006, 4, 1), 40],
                        [Date.UTC(2006, 5, 1), 44],[Date.UTC(2006, 6, 1), 35],[Date.UTC(2006, 7, 1), 31],[Date.UTC(2006, 8, 1), 26],
                        [Date.UTC(2006, 9, 1), 20],[Date.UTC(2006, 10, 1), 18],[Date.UTC(2006, 11, 1), 15],[Date.UTC(2006, 12, 1), 10],
                        [Date.UTC(2006, 13, 1), 20],[Date.UTC(2006, 14, 1), 22],[Date.UTC(2006, 15, 1), 23]]
            }, {
                name : 'Queda',
                data : [[Date.UTC(2006, 1, 1), 30],[Date.UTC(2006, 2, 1), 23],[Date.UTC(2006, 3, 1), 14],[Date.UTC(2006, 4, 1), 10],
                        [Date.UTC(2006, 5, 1), 12],[Date.UTC(2006, 6, 1), 14],[Date.UTC(2006, 7, 1), 16],[Date.UTC(2006, 8, 1), 25],
                        [Date.UTC(2006, 9, 1), 31],[Date.UTC(2006, 10, 1), 38],[Date.UTC(2006, 11, 1), 40],[Date.UTC(2006, 12, 1), 44],
                        [Date.UTC(2006, 13, 1), 51],[Date.UTC(2006, 14, 1), 52],[Date.UTC(2006, 15, 1), 50]]
            }]
        });    
    }
});


