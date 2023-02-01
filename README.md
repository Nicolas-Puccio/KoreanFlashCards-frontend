# KoreanFlashCards
Test project to practice MERN stack
Inspiration taken from Mirinae, Avocards, and jpdb


flashcard + dictionary while reading

each song contains an explanation of every word in the lyrics.
this allows the user to clic on any word and get a dictionary definition.

some words are also stored as flashcards which the user can later review through a very simple SRS.



# Tasks
<ul>
<li>remove login requirement</li>
<li>login will allow to see and participate in leaderboard</li>
<li>login eventually allow user to store stats on db</li>


<li>redirect user to login screen if token expires?</li>
<li>finish login</li>
<li>remove testPage.js</li>
<li>fix all key properties of lists</li>
<li>keep track of pass/fail rate of reviews</li>
<li>set favorite song</li>
<li>review favorite songs' cards only</li>
<li>add leaderboard page</li>
<li>review button at songDetail</li>
<li>consider: reuse the same app menu to include specific component's options, this way i don't have to add another menu to each component</li>


<li>allow user to modify color used for displaying lyrics</li>
<li>allow user to set intervals</li>
<li>consider reducing next interval time if card has been due for a while, maybe up to a certain percentage</li>
<li>consider: offer user to change review interval if pass/fail rate is outside desired range (80%-95%?)</li>
<li>consider: add another progress bar to songList, maybe to show seen words or words with a 2 or 3 score (basically learning words)</li>
</ul>