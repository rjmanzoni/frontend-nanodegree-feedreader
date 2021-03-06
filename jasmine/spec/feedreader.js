/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url allFeeds field defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toEqual('');
            });
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name allFeeds field defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual('');
            });
         });
    });


    /* Write a new test suite named "The menu" */

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    describe('The menu', function(){
        var body;

         beforeEach(function() {
            body = $('body');
        });

        it('menu element is hidden by default', function(){
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it('menu changes visibility when clicked', function(){
            $('.menu-icon-link').trigger( "click" );
            expect(body.hasClass('menu-hidden')).toBe(false);
            
            $('.menu-icon-link').trigger( "click" );
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });

    /* Write a new test suite named "Initial Entries" */

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial Entries', function(){

        beforeEach(function(done) {
           loadFeed(0, function(){
                done();
           });
        });


        it('there is at least a single entry element within the feed container', function(done){
            expect($('.feed').find('.entry').length).not.toBeLessThan(1);
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function(){

        //variavel que indica mudanca no conteudo
        var changed;

        beforeEach(function(done) {
           loadFeed(0, function(){
            changed = false;
                done();
           });
        });

        it('when a new feed is loaded by the loadFeed function that the content actually changes', function(done){
            
            expect(changed).toBe(false);

            //listener que altera o valor de changed quando o conteudo muda
            $('.feed').bind("DOMSubtreeModified",function(){
                changed = true;
            });

            loadFeed(1, function(){
                expect(changed).toBe(true);
                done();
            });

        });
    });

    describe('Error handling for undefined variables and out-of-bound array access', function(){
        it('undefined allFeeds', function(){
            allFeeds = undefined;
            expect(function() {
                loadFeed(0);
            }).toThrowError("Feeds must be defined");
        });

        it('Array out of bound allFeeds', function(){
            allFeeds = [];
            expect(function() {
                loadFeed(1);
            }).toThrowError("Array out of bound");
        });
    });

}());