/**
 * Created by sunil on 12/30/15.
 */
graphData=new Mongo.Collection('graphData');
Meteor.methods({
    'AddData':function(value){
        return graphData.insert(value);
    }
});