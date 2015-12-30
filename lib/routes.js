/**
 * Created by sunil on 12/30/15.
 */
Router.configure({
    layoutTemplate:'layoutWrapper'
});

Router.route('/',function(){
    this.render('home');
});