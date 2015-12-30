Template.addData.onCreated(function(){
    var instance=this;
    instance.chartObj=new ReactiveVar(null);
    this.autorun(function(){
        instance.subscribe('getGraphValue');
        instance.GraphData=new ReactiveVar([0,0,0,0,0,0,0,0,0,0]);
        graphData.find().observeChanges({
            added:function(id,doc){
                console.log(doc);
                var graphArray=instance.GraphData.get();
                var value=doc.value-1;
                graphArray[value]+=1;
                instance.chartObj.set(graphArray);
            }
        });
    });
});
Template.addData.onRendered(function(){
    var self=Template.instance();
    this.autorun(function(){
        var Chartdata=self.chartObj.get();
        console.log(Chartdata);
        var ctx = document.getElementById('GraphId').getContext("2d");
        var data = {
            labels: ['1','2','3','4','5','6','7','8','9','10'],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: /*"rgba(63, 191, 104)"*/ '#F7464A',
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#000",
                    pointHighlightFill: "#000",
                    pointHighlightStroke: /*"rgba(220,220,220,1)"*/ "#46BFBD",
                    data:Chartdata
                }
            ]
        };
        chartObj = new Chart(ctx).Line(data, options);
    });
});
Template.addData.helpers({
    'getValue':function(){
            var value=[{'value':1}, {value:2},{value:3},{value:4},{value:5},{value:6},{value:7},{value:8},{value:9},{value:10}];
            return value;
    }
});

Template.addData.events({
    'click #AddData':function(e){
        e.preventDefault();
        var Graphvalue=$('#selectGraphValue option:selected').attr('value');
        var data={
            value:Graphvalue
        }
        Meteor.call('AddData',data,function(err,res){
            if(!err){
                Bert.alert( 'Successfully Added.Check out Graph', 'success', 'growl-top-right' );
            }else{
                Bert.alert( err.reason, 'danger', 'growl-top-right' );
            }

        });
    }
});