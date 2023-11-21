import { initializeApp } from "firebase/app"
import { doc, getDoc, getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDSgOA40muwQe3BZL7crBwL8iAyctv2py4",
    authDomain: "vicfood-596fd.firebaseapp.com",
    projectId: "vicfood-596fd",
    storageBucket: "vicfood-596fd.appspot.com",
    messagingSenderId: "394779782313",
    appId: "1:394779782313:web:4a5af1070aa77158e40db8",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const cache: { [key: string]: IGReview } = {}

export default async function getReviewsForDay(
    year: number,
    month: number,
    day: number
): Promise<IGReview> {
    const documentId = `${year}-${month}-${day}`

    if (cache[documentId]) {
        return cache[documentId]
    }

    const reviews = await getDoc(doc(db, "reviews", documentId))

    const reviewData = reviews.data()

    const cachedReview = {
        lunch: reviewData?.lunch,
        dinner: reviewData?.dinner,
    } as IGReview

    cache[documentId] = cachedReview

    return cachedReview
}
