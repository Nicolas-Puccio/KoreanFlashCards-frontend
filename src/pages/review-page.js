import ReviewOptions from '../components/review-options'
import ReviewSession from '../components/review-session'

import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'


export default function ReviewPage({ data: { user } }) {

    // array of words that are being reviewed in the current session, if empty display ReviewOptions
    const [wordsReviewing, setWordsReviewing] = useState([])


    useEffect(() => {
        // sends the setter to Globals so navbar can use it to stop the review session when clicking the review Link
        Globals.setWordsToReview = setWordsReviewing
    }, [])


    return (
        <>
            {
                wordsReviewing.length === 0 && <ReviewOptions data={{ setWordsReviewing }} />
            }
            {
                wordsReviewing.length > 0 && <ReviewSession data={{ wordsReviewing, setWordsReviewing, user }} />
            }
        </>
    )
}