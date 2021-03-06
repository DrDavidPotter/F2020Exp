// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "intro", "preload-exp", "testAudioCapability", "consent", "instructions", randomizeNoMoreThan(anyOf("SI3", "Jimmy", "FillersRating", "FillersFC", "WH"),2), "demo1","demo2","demo3","demo4", "demo5", "demo6", "demo7", "demo8", SendResults(), "bye" )

CheckPreloaded()
	.label( "preload-exp")



//DebugOff()


// What is in Header happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global(),

    // Delay of 250ms before every trial
    newTimer(250)
        .start()
        .wait()
)
.log( "Name" , getVar("ParticipantName") )
// This log command adds a column reporting the participant's name to every line saved to the results




newTrial( "intro" ,
    newText("<p>Thank you for participating in this study! Your participation is completely voluntary and anonymous. No data will be gathered that could identify you uniquely, and your responses will remain confidential.<p></p><p>In this survey, which should take no more than 45 minutes to complete, you will listen to sentences and short dialogues in English and then either answer a question about what you heard or tell us how natural what you heard was.</p><p>We would like your response to reflect what an ordinary person would think about these sentences, based on how they sound.</p><p>Please enter your worker ID below and press Enter:</p>")
    	.size(800,)
        .print(),

	newText("<p></p>")
		.center()
		.print(),
    
    newTextInput()
        .print()
    	.size(800,)
        .wait()                 // The next command won't be executed until Enter is pressed
        .setVar( "ParticipantName" )
        // This setVar command stores the value from the TextInput element into the Var element

)


newTrial( "testAudioCapability" ,
	newText("<p> This is an auditory survey, and so in order to participate you must be able to hear the sentences that will be played.</p> <p> Please type the words that you hear and click enter. If you cannot hear the words and type them correctly, you will be unable to participate in this survey.</p><p></p>")
    	.size(800,)
        .print(),
  
	newButton("Play")
    	.size(800,)
        .print()
        .wait()
        .remove(), 
  
	newAudio("YEP", "audioTest1_mono.mp3")
        .play(),
  
    newTextInput("Response")
    	.size(800,)
        .print()
        .wait()
        .log(),
            
    newButton("Next")
    	.size(800,)
        .print()
        .wait(getTextInput("Response").test.text(/[Ll]augh/))
        .remove(),

	getTextInput("Response").remove(),

	newButton("Play")
    	.size(800,)
        .print()
        .wait()
        .remove(), 
  
	newAudio("YEP2", "audioTest2.mp3")
        .play(),
  
    newTextInput("Response2")
    	.size(800,)
        .print()
        .wait()
        .log(),
            
    newButton("Next")
    	.size(800,)
        .print()
        .wait(getTextInput("Response2").test.text(/[Gg]as/)),

)



newTrial( "consent" ,

	newHtml("consent", "consent.html")
    	.size(800,)
		.print(),

	newButton("click", "Accept")
    	.print()
    	.size(800,)
	    .wait()
	    .log()
    
)


newTrial( "instructions" ,
    newText("<p>In this survey, you will be listening to a series of auditory recordings. In some of the recordings, you will hear two people, Anne and Bill, talking to each other. In others, you will hear just one person, either Bill or Anne. Please note that you will be able to listen to each recording only <b>once</b>, so please be sure to listen carefully.</p><p>After each recording, you will be asked a question about what you just heard. There are two types of questions you will hear.<p></p><p>In some of these questions, we will ask you to consider what Anne or Bill said, and then rate how natural it sounded, on a scale of one to seven. Some of these phrases will seem natural, and so should receive a high rating. A natural phrase is one that would seem unremarkable if you heard someone say it. Some of the other phrases will seem less natural, and so should be rated low. These less natural phrases would be surprising to hear, they might sound like a mistake, or they might just sound odd. Please use the whole scale; if a phrase sounds completely natural or completely unnatural, don’t be afraid to assign it a seven or a one.</p> <p></p><p>In other questions, we will ask about the meaning of what you just heard. We will present you with two possible answers to a question, and you should pick the one that best fits what you thought the sentence meant.</p><p> In general, please use your intuitions as a speaker of English in making your judgments, rather than of any rule you may have been taught. We're interested in how people actually use and understand language, rather than what is considered <i>proper</i> or <i>correct</i>.What matters to us is <i>your</i> judgments about language.</p><p>There will be 102 items in total, followed by a few demographic questions; these recordings will load at the start of the survey. This loading typically takes less than a minute, although how long it takes will depend on the speed of your internet connection. A counter on each screen will indicate your progress.</p>")
    	.size(800,)
        .print(),

	newText("<p></p>")
		.center()
		.print(),
        
    newButton("Next")
    	.size(800,)
		.print()
		.wait()
            
)


//SI3
Template( "SI3.csv" ,

    SI3 => newTrial( "SI3" ,

        newAudio("YEP", SI3.Audiostim)
	        .play(),

        newText("<p></p>")
            .center()
            .print(),

        newText(SI3.QUD)
	    	.size(800,)
            .print(),
  
        newScale("score", "(Least Natural) 1", "2", "3", "4", "5", "6", "7 (Most Natural)")
	        .before(newText("left", "Rating "))
	        .radio()
	        .labelsPosition("top")
	        .disable()
			.print(),

		//These lines ensure that the audio file finishes playing before the scale can get clicked 
        getAudio("YEP")
	        .wait("first"),

		getScale("score")
			.enable()
	        .print()
	        .log(),

          newText("<p></p>")
            .center()
            .print(),
  
    		//This command presents the next button, but only allows you to click on it if a rating has been selected
        newButton("After rating what you heard, click here to continue.")
	    	.size(800,)
	        .print()
	        .wait(getScale("score").test.selected())
        
    )
    .log( "Audiostim" , SI3.Audiostim )
    .log( "StimAnt" , SI3.StimAnt )
    .log( "StimResp" , SI3.StimResp )
    .log("SubExp", SI3.SubExp)
    .log("Group", SI3.Group)
    .log("Cond1", SI3.Cond1)
    .log("Cond2", SI3.Cond2)
    .log("Cond3", SI3.Cond3)
    .log("Condition", SI3.Condition)
    .log("Context", SI3.Context)
    .log("Item", SI3.Item)
)



//Jimmy
Template( "Jimmyanswers.csv" ,

    Jimmy => newTrial( "Jimmy" ,

        newAudio("YEP", Jimmy.Audiostim)
	        .play(),

        newText("<p></p>")
            .center()
            .print(),

        newText(Jimmy.QUD)
	    	.size(800,)
            .print(),
  
        newScale("score", "(Least Natural) 1", "2", "3", "4", "5", "6", "7 (Most Natural)")
	        .before(newText("left", "Rating "))
	        .radio()
	        .labelsPosition("top")
	        .disable()
			.print(),

		//These lines ensure that the audio file finishes playing before the scale can get clicked 
        getAudio("YEP")
	        .wait("first"),

		getScale("score")
			.enable()
	        .print()
	        .log(),

          newText("<p></p>")
            .center()
            .print(),
  
    		//This command presents the next button, but only allows you to click on it if a rating has been selected
        newButton("After rating what you heard, click here to continue.")
	    	.size(800,)
	        .print()
	        .wait(getScale("score").test.selected())
        
    )
    .log( "Audiostim" , Jimmy.Audiostim )
    .log( "Stim" , Jimmy.Stim )
    .log("SubExp", Jimmy.SubExp)
    .log("Group", Jimmy.Group)
    .log("Cond1", Jimmy.Cond1)
    .log("Cond2", Jimmy.Cond2)
    .log("Context", Jimmy.Context)
    .log("Condition", Jimmy.Condition)
    .log("Item", Jimmy.Item)
)

//FillersRating
Template( "filleranswersRating.csv" ,

    FillersRating => newTrial( "FillersRating" ,

        newAudio("YEP", FillersRating.Audiostim)
	        .play(),

        newText("<p></p>")
            .center()
            .print(),

        newText(FillersRating.QUD)
	    	.size(800,)
            .print(),
  
        newScale("score", "(Least Natural) 1", "2", "3", "4", "5", "6", "7 (Most Natural)")
	        .before(newText("left", "Rating "))
	        .radio()
	        .labelsPosition("top")
	        .disable()
			.print(),

		//These lines ensure that the audio file finishes playing before the scale can get clicked 
        getAudio("YEP")
	        .wait("first"),

		getScale("score")
			.enable()
	        .print()
	        .log(),

          newText("<p></p>")
            .center()
            .print(),
  
    		//This command presents the next button, but only allows you to click on it if a rating has been selected
        newButton("After rating what you heard, click here to continue.")
	    	.size(800,)
	        .print()
	        .wait(getScale("score").test.selected())
        
    )
    .log( "Audiostim" , FillersRating.Audiostim )
    .log( "Stim" , FillersRating.Stim )
    .log("SubExp", FillersRating.SubExp)
    .log("Group", FillersRating.Group)
    .log("Cond1", FillersRating.Cond1)
    .log("Cond2", FillersRating.Cond2)
    .log("Cond3", FillersRating.Cond3)
    .log("Context", FillersRating.Context)
    .log("Item", FillersRating.Item)
)

//FillersFC
Template( "filleranswersFC.csv" ,

    FillersFC => newTrial( "FillersFC" ,


        newAudio("YEP", FillersFC.Audiostim)
        	.play(),
        
        newText("<p></p>")
            .center()
            .print(),

        newText(FillersFC.QUD)
	    	.size(800,)
            .print(),

        newText("<p></p>")
            .center()
            .print(),
            
        newScale("answer", FillersFC.AltA, FillersFC.AltB)
	    	.size(800,)
            .settings.radio()
            .settings.labelsPosition("right")
            .vertical()
            .disable()
			.print(),

		//These next series of commands together ensure that the audio file finishes playing before the scale can get clicked 
        getAudio("YEP")
	        .wait("first"),

		getScale("answer")
			.enable()
	        .print()
	        .log(),

		newText("<p></p>")
            .center()
            .print(),
  
  
  		//This command presents the next button, but only allows you to click on it if an interpretation has been selected
        newButton("After selecting how you interpreted the sentence, click here to continue.")
	    	.size(800,)
	        .print()
	        .wait(getScale("answer").test.selected())        
    )
    .log( "Audiostim" , FillersFC.Audiostim )
    .log( "Stim" , FillersFC.Stim )
    .log( "AltA" , FillersFC.AltA )
    .log( "AltB" , FillersFC.AltB )    
    .log( "QUD" , FillersFC.QUD )    
    .log( "HighResponse" , FillersFC.HighResponse )
    .log( "HighResponsePresentationOrder" , FillersFC.HighResponsePresentationOrder )
    .log("SubExp", FillersFC.SubExp)
    .log("Group", FillersFC.Group)
    .log("Cond1", FillersFC.Cond1)
    .log("Cond2", FillersFC.Cond2)
    .log("Context", FillersFC.Context)
    .log("Item", FillersFC.Item)
)


//Wh
Template( "WhAnswers.csv" ,

    Wh => newTrial( "Wh" ,


        newAudio("YEP", Wh.Audiostim)
        	.play(),
        
        newText("<p></p>")
            .center()
            .print(),

        newText(Wh.QUD)
	    	.size(800,)
            .print(),

        newText("<p></p>")
            .center()
            .print(),
            
        newScale("answer", Wh.AltA, Wh.AltB)
	    	.size(800,)
            .settings.radio()
            .settings.labelsPosition("right")
            .vertical()
            .disable()
			.print(),

		//These next series of commands together ensure that the audio file finishes playing before the scale can get clicked 
        getAudio("YEP")
	        .wait("first"),

		getScale("answer")
			.enable()
	        .print()
	        .log(),

		newText("<p></p>")
            .center()
            .print(),
  
  
  		//This command presents the next button, but only allows you to click on it if an interpretation has been selected
        newButton("After selecting how you interpreted the sentence, click here to continue.")
	    	.size(800,)
	        .print()
	        .wait(getScale("answer").test.selected())        
    )
    .log( "Audiostim" , Wh.Audiostim )
    .log( "Stim" , Wh.Stim )
    .log( "AltA" , Wh.AltA )
    .log( "AltB" , Wh.AltB )    
    .log( "QUD" , Wh.QUD )    
    .log( "HighResponse" , Wh.HighResponse )
    .log( "HighResponsePresentationOrder" , Wh.HighResponsePresentationOrder )
    .log("SubExp", Wh.SubExp)
    .log("Group", Wh.Group)
    .log("Cond1", Wh.Cond1)
    .log("Cond2", Wh.Cond2)
    .log("Context", Wh.Context)
    .log("Item", Wh.Item)
)


newTrial( "demo1" ,
    newText("You're almost done! Before you finish, we'd like to ask you a little bit about yourself. Your responses will have no impact on your compensation for participation in this survey.")
    	.size(800,)
    	.print(),


	newText("<p></p>")
		.center()
		.print(),
            
    newButton("Next")
    	.size(800,)
        .print()
        .wait()
)


newTrial( "demo2" ,
    newText("What is your gender?")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

    newScale("Gender", "male", "female", "non-binary", "decline to answer")
        .settings.radio()
        .settings.labelsPosition("right")
        .vertical()
    	.size(800,)
        .print()
        .wait()
        .log(),

	newText("<p></p>")
		.center()
		.print(),
            
    newButton("Next")
    	.size(800,)
        .print()
        .wait()
)


newTrial( "demo3" ,
    newText("Please choose one of the following ethnic classifications.")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

    newScale("Ethnicity", "Hispanic or Latino", "Not Hispanic or Latino", "Decline to answer")
        .settings.radio()
        .settings.labelsPosition("right")
        .vertical()
    	.size(800,)
        .print()
        .wait()
        .log(),

	newText("<p></p>")
		.center()
		.print(),
            
    newButton("Next")
    	.size(800,)
        .print()
        .wait()
)

newTrial( "demo4" ,
    newText("Please choose one of the following race classifications.")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

    newScale("Race", "American Indian or Alaska Native", "Asian", "African American or Black", "Native Hawaiian or Other Pacific Islander", "White", "More than one race", "Other", "Decline to answer")
        .settings.radio()
        .settings.labelsPosition("right")
        .vertical()
    	.size(800,)
        .print()
        .wait()
        .log(),

	newText("<p></p>")
		.center()
		.print(),
            
    newButton("Next")
    	.size(800,)
        .print()
        .wait()
)

newTrial( "demo5" ,
    newText("What is your age?")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

	newText("Enter 0 if you do not want to provide this information.")
    	.size(800,)
        .print(),

	newText("<p></p>")
		.center()
		.print(),

    newTextInput("age")
    	.size(800,)
        .print()
        .wait()
        .log(),
            

    newButton("Next")
    	.size(800,)
        .print()
        .wait(getTextInput("age").test.text(/^[0-9]*$/))

)

newTrial( "demo6" ,
    newText("What state did you grow up in? If you did not grow up in the United States, which country did you grow up in?")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

	newText("Enter 0 if you do not want to provide this information.")
    	.size(800,)
        .print(),

	newText("<p></p>")
		.center()
		.print(),

    newTextInput("State")
    	.size(800,)
        .print()
        .wait()
        .log(),
            
	newText("<p></p>")
		.center()
		.print(),

    newButton("Next")
    	.size(800,)
        .print()
        .wait()

)

newTrial( "demo7" ,
    newText("Are you a native speaker of American English? In other words, did you grow up speaking English in the home, within the US? (Your payment is not dependent on how you answer this question.)")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

    newScale("NativeSpeaker", "Yes", "No")
        .settings.radio()
        .settings.labelsPosition("right")
        .vertical()
    	.size(800,)
        .print()
        .wait()
        .log(),

	newText("<p></p>")
		.center()
		.print(),
            
    newButton("Next")
    	.size(800,)
        .print()
        .wait()
)


newTrial( "demo8" ,
    newText("Do you have any feedback about the survey? Was there anything distinctive or odd about the items?")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

    newTextInput("Feedback")
    	.size(800,)
        .print()
        .wait()
        .log(),
            
	newText("<p></p>")
		.center()
		.print(),

    newText("Click next to submit your results and complete the experiment.")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

    newButton("Next")
    	.size(800,)
        .print()
        .wait()

)




// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial( "bye" ,
    newText("Thank you for your participation!")
    	.size(800,)
    	.print(),

	newText("<p></p>")
		.center()
		.print(),

    newText("Please input your workerID into the MTurk survey code box")
    	.size(800,)
    	.print(),    	
    	
    newButton().wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial