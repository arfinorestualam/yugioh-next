import Image from "next/image"
import { RefreshCcw, Home } from "lucide-react"
import Link from "next/link"

interface ErrorPageProps {
  isEmptyData: boolean
  errorMessage?: string
  onRetry: () => void
}

export default function ErrorPage({ isEmptyData, errorMessage, onRetry }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-indigo-900">
      <div className="text-center px-4 py-8 max-w-2xl">
        <div className="mb-8 mx-auto w-64 h-64 overflow-hidden rounded-full border-4 border-indigo-300 shadow-lg">
          <Image
            src="/dark-magician.png"
            alt="Dark Magician"
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-indigo-800">
          {isEmptyData ? "No Cards Found in This Realm" : "A Magical Mishap Occurred!"}
        </h1>
        <p className="text-xl mb-4 text-indigo-700">
          {isEmptyData
            ? "It seems the cards have vanished into the Shadow Realm. Try adjusting your search or filters."
            : "The Dark Magician couldn't conjure the cards. Here's what we know:"}
        </p>
        {!isEmptyData && errorMessage && (
          <div className="bg-indigo-100 p-4 rounded-lg mb-8 text-left">
            <p className="font-mono text-sm break-all text-indigo-800">{errorMessage}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onRetry}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center transition duration-300"
          >
            <RefreshCcw className="mr-2" />
            Try Again
          </button>
          <Link
            href="/"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center transition duration-300"
          >
            <Home className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

