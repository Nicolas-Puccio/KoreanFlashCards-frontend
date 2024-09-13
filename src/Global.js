
import { songs } from './songs.js';
import { words } from './words.js';

export let Globals = {
  setWordsToReview: undefined, // set by review-page
  setSelectedSong: undefined // set by songs-page
}

//why do i have to use export instead of setting exports.Globals?

export const setGlobals = async (data) => {

  if (Globals.$words) // data already initialized
    return

  Globals.$words = words
  Globals.$songs = songs;
  Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []

  // parses all string dates into Date
  Globals.$stats.forEach(stat => {
    stat.next = new Date(stat.next)
  })



  //#region test for db words
  const missingWords = [];

  // Iterate through each song
  Globals.$songs.forEach(song => {
    // Iterate through each line in the song
    song.lines.forEach(line => {
      // Iterate through each structure in the line
      line.structures?.forEach(structure => {
        // Iterate through each word in the structure
        structure.words.forEach(wordObj => {
          // Check if the word exists in the $words dictionary
          const wordExists = Globals.$words.find(word2 => word2.word === wordObj.word);

          // If the word is not found, add it to the missingWords array
          if (!wordExists && wordObj.word) {
            missingWords.push({
              word: wordObj.word,
              meaning: wordObj.meaning
            });
          }
        });
      });
    });
  });

  // Return the list of missing words
  console.log(missingWords)





  /**
       * Validates that each structure's 'written' field matches the concatenation
       * of the 'written' fields of its 'words' field in a list of songs.
       * 
       * @param {Array} songs - List of songs, each containing a list of lines,
       *                        where each line contains a list of structures.
       * @returns {boolean} - True if all structures are valid, False otherwise.
       */
  for (const song of songs) {
    for (const line of song.lines || []) {
      for (const structure of line.structures || []) {
        const wordsWritten = (structure.words || [])
          .map(word => word.written || '')
          .join('');

        if (wordsWritten !== structure.written) {
          console.log(`Mismatch ${song.title}:`, structure);
        }
      }
    }
  }







  //#endregion


  //testing for backend disabled
  return

  if (Globals.$words) // data already initialized
    return



  //backend responded
  if (data) {
    Globals.$words = data.words
    Globals.$songs = data.songs

    if (data.stats.length)
      Globals.$stats = data.stats
    else
      Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []


    localStorage.setItem('songs', JSON.stringify(Globals.$songs))
    localStorage.setItem('words', JSON.stringify(Globals.$words))
    localStorage.setItem('stats', JSON.stringify(Globals.$stats))
  }

  else {
    Globals.$words = JSON.parse(localStorage.getItem('words')) ?? []
    Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? []
    Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []


    if (Globals.$words.length)
      alert('backend is down but a copy of the data has been loaded from localStorage')
  }



  // parses all string dates into Date
  Globals.$stats.forEach(stat => {
    stat.next = new Date(stat.next)
  })
}
