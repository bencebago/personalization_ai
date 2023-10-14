Qualtrics.SurveyEngine.addOnload(function()
{
// Define the arrays of posts
var array1 = ["Unusual jet stream patterns contributing to extreme weather, but not definitively linked to climate change","Climate change presents risks to US infrastructure and trade","Wildfires pose threat to Superfund sites","Study finds natural variability plays larger role in extreme weather events.","New Study Finds Some Scientists Still Reject Reality of Human-Caused Global Warming","Brazil's minimal efforts to combat climate change praised","CO2 Levels Reach Highest Levels in 3 Million Years, Natural Causes Suspected","Rising Sea Levels a Concern for US Military Bases","UN Conference Addresses Controversial Issue of Hydrofluorocarbon Emissions","The Ongoing Debate over Climate Change and its Causes","Svalbard Seed Vault Remains Secure Despite Recent Flooding","Experts Discuss the Role of Reforestation in Climate Change Mitigation Strategies","Experts Discuss Factors Behind Devastating 2017 US Wildfire Season","Poll shows rising awareness of climate change, but limited willingness to act","IPCC Report Highlights Need for Coordinated Efforts to Address Climate Change and Land Use Issues","Imran Khan's Government Addresses Environmental Concerns in Pakistan","Examining the Impact of Climate Change","Agriculture and Climate Change: How Our Food Choices Impact the Environment","Evaluating the Role of Nuclear Energy in Decarbonization","Hurricane Science Advances with New Technology and Climate Change Considerations","UN Report Details Ongoing Challenges in Addressing Climate Change","Climate change and the economy: new report assesses potential risks and challenges","Climate Summit Focuses on Nature-Based Solutions to Warming","The Economy and Climate Change: Republican Perspectives on Balancing Priorities","El Yunque Scientists Study Effects of Warmer Temperatures on Rainforest Plants","Climate Change: A Growing Concern Amidst Debate and Uncertainty","Climate Warming Stripes Go Viral, Prompting Debate Over Human Impact on the Planet","Obama Discusses US Emissions Reduction Efforts at UN Summit","Cities Making Strides in Emissions Reduction Efforts","Examining Rex Tillerson's Record on Climate Change","Holistic Grazing Method at 777 Bison Ranch Addresses Climate Change","Climate Wars: Exploring the Potential Links Between Climate Change and Conflict","Climate Change and National Security: Assessing the Threat","The Complexity of Natural Disasters and their Relation to Climate Change","Renewable Energy Enjoys Broad Support, but Polarization Remains on Climate Policy Issues","Yale and George Mason University Poll Shows Mixed Views on Climate Change","Norway Struggles to Balance Climate Goals with Oil and Gas Industry","Investigating the Link Between Climate Change and the Spread of Lyme Disease","Right-wing Opinion on Climate Change Slowly Evolving, with Some Supporting Carbon Tax","UN report highlights concerns over used car exports to developing countries","Examining the Evidence: The Role of Climate Change in Natural Disasters","Environmental Factors and Personal Behaviors Both Affect Health","Geoengineering: A controversial solution to climate change.","Exploring the Debate over Adapting to Climate Change","Climate Change: A National Security Threat or a Political Issue","China's top climate experts propose ambitious decarbonization timeline","Study Shows Mixed Results for Oil Companies' Climate Change Pledges","UN Report Highlights Continuing Divide Between Climate Goals and Actions"];
var array2 = ["Endangered California Condors Can Reproduce Asexually, Study Finds","Vikings Were in the Americas Exactly 1000 Years Ago","These Worms Left the Ocean Floor and Never Looked Back","A Strange Comet Erupted 4 Times in a ‘Super Outburst’","Studies of Moth and Butterfly Genes Color In a Scientific Classic","It’s Turtles All the Way Down in the Fossil Record","The Ankylosaur’s Tail-Club Wasn’t Only Swinging at T. Rex","The Missing Mammal That May Have Shaped California’s Kelp Forests","One of Nature’s Most Impressive Jumpers: The Springtail.","Why Some Penguins Give Up on Half of Their Unhatched Eggs","Ant Milk: It Does a Colony Good","Some Monkeys Use Stone Tools for Pleasure, Study Suggests","When Antlers Tangle, Sometimes Both Animals Lose","A Giant Stingray May Be the World’s Largest Freshwater Fish","The Secret to an Elephant’s Trunk Is Skin Deep","How a See-Through Frog Hides Its Red Blood From Predators","Why This Trilobite Had Neptune’s Trident for a Nose","Modern and Ancient Crickets May Sing the Same Song","These Bats Buzz Like Hornets to Scare Off Predators","Some Elephants Are Getting Too Much Plastic in Their Diets"];

var array1_copy = array1.slice()
var array2_copy = array2.slice()

// Create an array to store the HTML for each post
var posts = [];

// Add 10 randomly selected posts from each array
for (var i = 0; i < 20; i++) {
    var arrayNum = i < 10 ? 1 : 2;
 var postText = (arrayNum == 1 ? array1_copy : array2_copy).splice(Math.floor(Math.random() * (arrayNum == 1 ? array1_copy : array2_copy).length), 1)[0];
    //it should find the index of the post in that array, the previous line should report the index, and then postText would be just finding that
    var index = (arrayNum == 1 ? array1 : array2).indexOf(postText);
    var identifier = arrayNum == 1 ? index : index + array1.length;
    Qualtrics.SurveyEngine.setEmbeddedData('title'+i, postText);
    
	// Create the HTML for a post
    var postHTML = '<div class="post">' +
        '<div class="image-container">'+
            '<img src="https://lapsyde.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0BCoPuBPmXjcgzc">' +
        '</div>'+
        '<div class="vote-container">' +
            '<form method="post" onsubmit="return false;">' +
                '<button type="button" name="vote' + identifier + '" value="upvote" class="vote-button"><img src="https://lapsyde.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b8zxzvA8gzEeFoi"></button>' +
                '<br>' +
                '<button type="button" name="vote' + identifier + '" value="downvote" class="vote-button"><img src="https://lapsyde.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9M4Svx6FdAgx6g6"></button>' +
            '</form>' +
        '</div>' +
        '<div class="post-text">' +
            '<p style="font-size: 12px">Posted by u/WorldNews</p>' +
            '<h2>' + postText + '</h2>' +
        '</div>' +
        '<div class="clearfix"></div>' +
    '</div>';

    // Add the HTML to the array
    posts.push(postHTML);
}

// Randomize the order of the post HTML
posts = shuffle(posts);

// Add the HTML for each post to the page
posts.forEach(function(postHTML) {
    document.getElementById('posts').innerHTML += postHTML;
});

// Add an event listener to handle vote button clicks
var voteButtons = document.querySelectorAll('.vote-button');
voteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Remove 'active' class from all buttons in the same group
        var name = button.name;
        document.querySelectorAll('[name="' + name + '"]').forEach(function(b) {
            b.classList.remove('active');
        });
        // Add 'active' class to clicked vote button
        button.classList.add('active');

        // Store the value of the clicked vote button in Qualtrics embedded data
        Qualtrics.SurveyEngine.setEmbeddedData(name, button.value);


    });

});


 // Function to shuffle an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

});

Qualtrics.SurveyEngine.addOnReady(function() {
  var qobj = this;
  qobj.hideNextButton();
  var cbs = document.querySelectorAll('.vote-button');

  var numSelected = document.querySelectorAll('.vote-button.active').length;
  if(numSelected >= 20) qobj.showNextButton();

  for (var i = 0; i < cbs.length; i++) {
    cbs[i].addEventListener('click', function() {
      numSelected = document.querySelectorAll('.vote-button.active').length;
      if(numSelected >= 20) qobj.showNextButton();
    });
  }
});



Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});