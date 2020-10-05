function putMeOnTheScreen(widget, event, config) {
    var ele = config.ele;
    var width = ele.width();
    var height = ele.height();
    var myDiv = ele[0];
    const tagName = "tomtom-" + Math.floor(Math.random() * 1000).toString();
    myDiv.setAttribute("style","width: 99%; height: 99%; margin: 0 auto");
    myDiv.setAttribute("id",tagName);
    var secondaryValue = widget.queryResult.$$rows[0][2].text;
    var postfix_val = widget.style.postfix;
    var prefix_val = widget.style.prefix;

    function radialProgress(selector) {
        const parent = d3.select(selector)
        const size = parent.node().getBoundingClientRect()
        const svg = parent.append('svg')
          .attr('width', size.width)
          .attr('height', size.height);
        const outerRadius = Math.min(size.width, size.height) * 0.45;
        const thickness = 10;
        let value = 0;
        
        const mainArc = d3.arc()
          .startAngle(0)
          .endAngle(Math.PI * 2)
          .innerRadius(outerRadius-thickness)
          .outerRadius(outerRadius)
      
        svg.append("path")
          .attr('class', 'progress-bar-bg')
          .attr('transform', `translate(${size.width/2},${size.height/2})`)
          .attr('d', mainArc())
        
        const mainArcPath = svg.append("path")
          .attr('class', 'progress-bar')
          .attr('transform', `translate(${size.width/2},${size.height/2})`)
          .attr('fill', config.color)
        
        svg.append("circle")
          .attr('class', 'progress-bar')
          .attr('transform', `translate(${size.width/2},${size.height/2-outerRadius+thickness/2})`)
          .attr('width', thickness)
          .attr('height', thickness)
          .attr('r', thickness/2)
          .attr('fill', config.color)
      
        const end = svg.append("circle")
          .attr('class', 'progress-bar')
          .attr('transform', `translate(${size.width/2},${size.height/2-outerRadius+thickness/2})`)
          .attr('width', thickness)
          .attr('height', thickness)
          .attr('r', thickness/2)
          .attr('fill', config.color)
        
        let percentLabel = svg.append("text")
          .attr('class', 'progress-label')
          .attr('transform', `translate(${size.width/2},${size.height/2 - 5})`)
          .text('0')

        let goalLabel = svg.append("text")
          .attr('class', 'goal-label')
          .attr('transform', `translate(${size.width/2},${size.height/2 + 15})`)
          .text('0')
      
        return {
            update: function(progressPercent) {
                const startValue = value
                const startAngle = Math.PI * startValue / 50
                const angleDiff = Math.PI * progressPercent / 50 - startAngle;
                const startAngleDeg = startAngle / Math.PI * 180
                const angleDiffDeg = angleDiff / Math.PI * 180
                const transitionDuration = 1500
        
                mainArcPath.transition().duration(transitionDuration).attrTween('d', function(){
                return function(t) {
                    mainArc.endAngle(startAngle + angleDiff * t)
                    return mainArc();
                }
                })
                end.transition().duration(transitionDuration).attrTween('transform', function(){
                return function(t) {
                    return `translate(${size.width/2},${size.height/2})`+
                    `rotate(${(startAngleDeg + angleDiffDeg * t)})`+
                    `translate(0,-${outerRadius-thickness/2})`
                }
                })
                percentLabel.transition().duration(transitionDuration).tween('bla', function() {
                return function(t) {
                    percentLabel.text(widget.queryResult.$$rows[0][0].text)
                }
                })
                goalLabel.transition().duration(transitionDuration).tween('bla', function() {
                    return function(t) {
                        goalLabel.text(prefix_val + secondaryValue + postfix_val)
                    }
                    })
                value = progressPercent

            }
        }
    }
      
    let chart = radialProgress('#' + tagName)
    let widgetResults = Math.round((widget.queryResult.$$rows[0][0].data/config.denominator) * 100)
    chart.update(widgetResults)
    
}


