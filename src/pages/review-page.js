import ReviewOptions from '../components/review-options';
import ReviewSession from '../components/review-session';

import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'
import { useLocation } from 'react-router-dom'


export default function ReviewPage() {

    const [wordsToReview, setWordsToReview] = useState([])


    useEffect(() => {
        Globals.setWordsToReview = setWordsToReview
    }, [])


    return (
        <>
            {
                wordsToReview.length === 0 && <ReviewOptions data={{ setWordsToReview }} />//fix: add selected song here or on child?
            }
            {
                wordsToReview.length > 0 && <ReviewSession data={{ wordsToReview, setWordsToReview }} />
            }
        </>
    )
}