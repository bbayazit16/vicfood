"use server"

import getReviewsForDay from "@/lib/firebase"

export default async function getReviews(
    year: number,
    month: number,
    day: number
): Promise<IGReview> {
    return await getReviewsForDay(year, month, day)
}
