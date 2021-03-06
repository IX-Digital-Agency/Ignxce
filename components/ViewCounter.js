import { useState, useEffect } from 'react'
import format from 'comma-number'
import loadDb from '../scripts/db'

const ViewCounter = ({ id }) => {
    const [views, setViews] = useState('')

    useEffect(() => {
        const onViews = (newViews) => setViews(newViews.val())
        let db

        const fetchData = async () => {
            db = await loadDb()
            db.ref('views').child(id).on('value', onViews)
        }

        fetchData()

        return () => {
            if (db) {
                db.ref('views').child(id).off('value', onViews)
            }
        }
    }, [id])

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/increment-views?id=${encodeURIComponent(id)}`)

        registerView()
    }, [id])

    return `${views ? format(views) : '–––'} views`
}

export default ViewCounter