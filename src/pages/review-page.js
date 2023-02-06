import ReviewOptions from '../components/review-options'
import ReviewSession from '../components/review-session'

import React, { useState, useEffect } from 'react'
import Global from '../Global'


export default function ReviewPage() {

    // array of words that are being reviewed in the current session, if empty display ReviewOptions
    const [wordsToReview, setWordsToReview] = useState([])


    useEffect(() => {
        // sends the setter to Globals so navbar can use it to stop the review session when clicking the review Link
        Global.setWordsToReview = setWordsToReview
    }, [])


    return (
        <>
            {
                wordsToReview.length === 0 && <ReviewOptions data={{ setWordsToReview }} />
            }
            {
                wordsToReview.length > 0 && <ReviewSession data={{ wordsToReview, setWordsToReview }} />
            }
        </>
    )
}