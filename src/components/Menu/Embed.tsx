import { InstagramEmbed } from "react-social-media-embed"

type EmbedProps = {
    review?: IGReview
}

export default function Embed({ review }: EmbedProps) {
    if (review === undefined) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Loading reviews...</h1>
            </div>
        )
    } else if (review.dinner === undefined && review.lunch === undefined) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">No Reviews 🥲</h1>
                <p className="text-lg">Check back later!</p>
            </div>
        )
    }

    return (
        <div
            className={`flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-start ${
                review.lunch && review.dinner ? "justify-between" : "justify-center"
            }`}
        >
            {review.lunch && (
                <div className="flex flex-col items-center justify-start">
                    <InstagramEmbed key={review.lunch} url={review.lunch} width={328} />
                </div>
            )}
            {review.dinner && (
                <div className="flex flex-col items-center justify-start">
                    <InstagramEmbed key={review.dinner} url={review.dinner} width={328} />
                </div>
            )}
        </div>
    )
}
