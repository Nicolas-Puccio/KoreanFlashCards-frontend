# Deployment on Github Pages
https://nicolas-puccio.github.io/KoreanFlashCards-frontend/



# KoreanFlashCards
Test project to practice React

Inspiration taken from Mirinae, Avocards, and jpdb
flashcard + dictionary while reading

each song contains an explanation of every word in the lyrics.
this allows the user to clic on any word and get a dictionary definition.

some words are also stored as flashcards which the user can later review through a very simple SRS.



# How to use

## HOME

The HOME section allows the user to select a song and inspect the vocabulary it contains.
When clicking a word for the first time it will display it's whole sctructure.
A structure is a set of words that together share a meaning. Some structures are just single words.
This section displays the meaning of each word in this specific sentence

You can aditionally clic on any of the structure sections to see all definitions of the word, some of which may not apply to the current context.
for example the word '아무' is used as a Determiner in the song '민수 - 섬', but it could also be used as a Pronoun.

There are two checkboxes:
The first checkbox replaces the korean lyrics with an english translation.
The second checkbox disables the coloring of each word.

The color is determined by the score of the specific card from the SRS.



## REVIEW

todo



## STATS

todo



# Tasks
<ul>
<li>current css is meant for mobile, should adapt a little bit to desktop, spliting the screen in 2/3 sections</li>
<li>add graphs</li>
<li>redirect user to login screen if token expires?</li>
<li>finish login</li>
<li>fix all key properties of lists</li>
<li>keep track of pass/fail rate of reviews</li>
</ul>