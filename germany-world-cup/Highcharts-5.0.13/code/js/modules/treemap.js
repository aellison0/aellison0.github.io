/*
 Highcharts JS v5.0.13 (2017-07-27)

 (c) 2014 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(n){"object"===typeof module&&module.exports?module.exports=n:n(Highcharts)})(function(n){(function(f){var n=f.seriesType,t=f.seriesTypes,D=f.map,v=f.merge,E=f.extend,y=f.noop,m=f.each,w=f.grep,F=f.isNumber,z=f.isString,k=f.pick,u=f.Series,G=f.stableSort,H=function(a,c,b){b=b||this;f.objectEach(a,function(e,d){c.call(b,e,d,a)})},A=function(a,c,b,e){e=e||this;a=a||[];m(a,function(d,g){b=c.call(e,b,d,g,a)});return b},x=function(a,c,b){b=b||this;a=c.call(b,a);!1!==a&&x(a,c,b)};n("treemap","scatter",
{showInLegend:!1,marker:!1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",formatter:function(){return this.point.name||this.point.id},inside:!0},tooltip:{headerFormat:"",pointFormat:"\x3cb\x3e{point.name}\x3c/b\x3e: {point.value}\x3c/b\x3e\x3cbr/\x3e"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}}},{pointArrayMap:["value"],axisTypes:t.heatmap?["xAxis",
"yAxis","colorAxis"]:["xAxis","yAxis"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:y,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",translateColors:t.heatmap&&t.heatmap.prototype.translateColors,trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,c){a=A(a,function(a,c,d){c=k(c.parent,"");void 0===a[c]&&(a[c]=[]);a[c].push(d);return a},{});H(a,function(a,e,d){""!==e&&-1===f.inArray(e,c)&&(m(a,function(a){d[""].push(a)}),delete d[e])});return a},getTree:function(){var a=
D(this.data,function(a){return a.id}),a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},init:function(a,c){u.prototype.init.call(this,a,c);this.options.allowDrillToNode&&f.addEvent(this,"click",this.onClickDrillToNode)},buildNode:function(a,c,b,e,d){var g=this,h=[],B=g.points[c],C;m(e[a]||[],function(c){C=g.buildNode(g.points[c].id,c,b+1,e,a);h.push(C)});c={id:a,i:c,children:h,level:b,parent:d,visible:!1};g.nodeMap[c.id]=c;B&&(B.node=c);return c},setTreeValues:function(a){var c=
this,b=c.options,e=0,d=[],g,h=c.points[a.i];m(a.children,function(a){a=c.setTreeValues(a);d.push(a);a.ignore||(e+=a.val)});G(d,function(a,b){return a.sortIndex-b.sortIndex});g=k(h&&h.options.value,e);h&&(h.value=g);E(a,{children:d,childrenTotal:e,ignore:!(k(h&&h.visible,!0)&&0<g),isLeaf:a.visible&&!e,levelDynamic:a.level-(b.levelIsConstant?c.nodeMap[c.rootNode].level:0),name:k(h&&h.name,""),sortIndex:k(h&&h.sortIndex,-g),val:g});return a},calculateChildrenAreas:function(a,c){var b=this,e=b.options,
d=this.levelMap[a.levelDynamic+1],g=k(b[d&&d.layoutAlgorithm]&&d.layoutAlgorithm,e.layoutAlgorithm),h=e.alternateStartingDirection,f=[];a=w(a.children,function(a){return!a.ignore});d&&d.layoutStartingDirection&&(c.direction="vertical"===d.layoutStartingDirection?0:1);f=b[g](c,a);m(a,function(a,d){d=f[d];a.values=v(d,{val:a.childrenTotal,direction:h?1-c.direction:c.direction});a.pointValues=v(d,{x:d.x/b.axisRatio,width:d.width/b.axisRatio});a.children.length&&b.calculateChildrenAreas(a,a.values)})},
setPointValues:function(){var a=this.xAxis,c=this.yAxis;m(this.points,function(b){var e=b.node,d=e.pointValues,g,h;d&&e.visible?(e=Math.round(a.translate(d.x,0,0,0,1))-0,g=Math.round(a.translate(d.x+d.width,0,0,0,1))-0,h=Math.round(c.translate(d.y,0,0,0,1))-0,d=Math.round(c.translate(d.y+d.height,0,0,0,1))-0,b.shapeType="rect",b.shapeArgs={x:Math.min(e,g),y:Math.min(h,d),width:Math.abs(g-e),height:Math.abs(d-h)},b.plotX=b.shapeArgs.x+b.shapeArgs.width/2,b.plotY=b.shapeArgs.y+b.shapeArgs.height/2):
(delete b.plotX,delete b.plotY)})},setColorRecursive:function(a,c,b){var e=this,d,g;a&&(d=e.points[a.i],g=e.levelMap[a.levelDynamic],c=k(d&&d.options.color,g&&g.color,c,e.color),b=k(d&&d.options.colorIndex,g&&g.colorIndex,b,e.colorIndex),d&&(d.color=c,d.colorIndex=b),a.children.length&&m(a.children,function(a){e.setColorRecursive(a,c,b)}))},algorithmGroup:function(a,c,b,e){this.height=a;this.width=c;this.plot=e;this.startDirection=this.direction=b;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=
[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,b){return Math.max(a/b,b/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,
this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,c,b,e){var d,g,h,f,k=b.lW,p=b.lH,l=b.plot,n,q=0,r=b.elArr.length-1;c?(k=b.nW,p=b.nH):n=b.elArr[b.elArr.length-1];m(b.elArr,function(a){if(c||q<r)0===b.direction?(d=l.x,g=l.y,h=k,f=a/h):(d=l.x,g=l.y,f=p,h=a/f),e.push({x:d,y:g,width:h,height:f}),0===b.direction?
l.y+=f:l.x+=h;q+=1});b.reset();0===b.direction?b.width-=k:b.height-=p;l.y=l.parent.y+(l.parent.height-b.height);l.x=l.parent.x+(l.parent.width-b.width);a&&(b.direction=1-b.direction);c||b.addElement(n)},algorithmLowAspectRatio:function(a,c,b){var e=[],d=this,g,h={x:c.x,y:c.y,parent:c},f=0,k=b.length-1,p=new this.algorithmGroup(c.height,c.width,c.direction,h);m(b,function(b){g=b.val/c.val*c.height*c.width;p.addElement(g);p.lP.nR>p.lP.lR&&d.algorithmCalcPoints(a,!1,p,e,h);f===k&&d.algorithmCalcPoints(a,
!0,p,e,h);f+=1});return e},algorithmFill:function(a,c,b){var e=[],d,g=c.direction,h=c.x,f=c.y,k=c.width,p=c.height,l,n,q,r;m(b,function(b){d=b.val/c.val*c.height*c.width;l=h;n=f;0===g?(r=p,q=d/r,k-=q,h+=q):(q=k,r=d/q,p-=r,f+=r);e.push({x:l,y:n,width:q,height:r});a&&(g=1-g)});return e},strip:function(a,c){return this.algorithmLowAspectRatio(!1,a,c)},squarified:function(a,c){return this.algorithmLowAspectRatio(!0,a,c)},sliceAndDice:function(a,c){return this.algorithmFill(!0,a,c)},stripes:function(a,
c){return this.algorithmFill(!1,a,c)},translate:function(){var a=this,c=a.rootNode=k(a.rootNode,a.options.rootId,""),b,e;u.prototype.translate.call(a);a.levelMap=A(a.options.levels,function(a,b){a[b.level]=b;return a},{});e=a.tree=a.getTree();b=a.nodeMap[c];""===c||b&&b.children.length||(a.drillToNode("",!1),c=a.rootNode,b=a.nodeMap[c]);x(a.nodeMap[a.rootNode],function(b){var c=!1,d=b.parent;b.visible=!0;if(d||""===d)c=a.nodeMap[d];return c});x(a.nodeMap[a.rootNode].children,function(a){var b=!1;
m(a,function(a){a.visible=!0;a.children.length&&(b=(b||[]).concat(a.children))});return b});a.setTreeValues(e);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=c={x:0,y:0,width:100,height:100};a.nodeMap[""].values=c=v(c,{width:c.width*a.axisRatio,direction:"vertical"===a.options.layoutStartingDirection?0:1,val:e.val});a.calculateChildrenAreas(e,c);a.colorAxis?a.translateColors():a.options.colorByPoint||a.setColorRecursive(a.tree);a.options.allowDrillToNode&&(b=b.pointValues,a.xAxis.setExtremes(b.x,
b.x+b.width,!1),a.yAxis.setExtremes(b.y,b.y+b.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,c=w(a.points,function(a){return a.node.visible}),b,e;m(c,function(c){e=a.levelMap[c.node.levelDynamic];b={style:{}};c.node.isLeaf||(b.enabled=!1);e&&e.dataLabels&&(b=v(b,e.dataLabels),a._hasPointLabels=!0);c.shapeArgs&&(b.style.width=c.shapeArgs.width,c.dataLabel&&c.dataLabel.css({width:c.shapeArgs.width+"px"}));c.dlOptions=v(b,c.options.dataLabels)});
u.prototype.drawDataLabels.call(this)},alignDataLabel:function(a){t.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1})},drawPoints:function(){var a=this,c=w(a.points,function(a){return a.node.visible});m(c,function(b){var c="levelGroup-"+b.node.levelDynamic;a[c]||(a[c]=a.chart.renderer.g(c).attr({zIndex:1E3-b.node.levelDynamic}).add(a.group));b.group=a[c]});t.column.prototype.drawPoints.call(this);a.options.allowDrillToNode&&m(c,function(b){b.graphic&&
(b.drillId=a.options.interactByLeaf?a.drillToByLeaf(b):a.drillToByGroup(b))})},onClickDrillToNode:function(a){var c=(a=a.point)&&a.drillId;z(c)&&(a.setState(""),this.drillToNode(c))},drillToByGroup:function(a){var c=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(c=a.id);return c},drillToByLeaf:function(a){var c=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!c;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(c=a.id);return c},drillUp:function(){var a=this.nodeMap[this.rootNode];
a&&z(a.parent)&&this.drillToNode(a.parent)},drillToNode:function(a,c){var b=this.nodeMap[a];this.rootNode=a;""===a?this.drillUpButton=this.drillUpButton.destroy():this.showDrillUpButton(b&&b.name||a);this.isDirty=!0;k(c,!0)&&this.chart.redraw()},showDrillUpButton:function(a){var c=this;a=a||"\x3c Back";var b=c.options.drillUpButton,e,d;b.text&&(a=b.text);this.drillUpButton?this.drillUpButton.attr({text:a}).align():(d=(e=b.theme)&&e.states,this.drillUpButton=this.chart.renderer.button(a,null,null,
function(){c.drillUp()},e,d&&d.hover,d&&d.select).attr({align:b.position.align,zIndex:7}).add().align(b.position,!1,b.relativeTo||"plotBox"))},buildKDTree:y,drawLegendSymbol:f.LegendSymbolMixin.drawRectangle,getExtremes:function(){u.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;u.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,
dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};u.prototype.bindAxes.call(this);f.extend(this.yAxis.options,a);f.extend(this.xAxis.options,a)}},{getClassName:function(){var a=f.Point.prototype.getClassName.call(this),c=this.series,b=c.options;this.node.level<=c.nodeMap[c.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||k(b.interactByLeaf,!b.allowDrillToNode)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return F(this.value)},
setState:function(a){f.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},setVisible:t.pie.prototype.pointClass.prototype.setVisible})})(n)});
