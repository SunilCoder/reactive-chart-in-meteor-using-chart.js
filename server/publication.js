/**
 * Created by sunil on 12/30/15.
 */
Meteor.publish('getGraphValue',function(){
    return graphData.find();
});