export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2023 Yu-Gi-Oh! Card Gallery. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">
          Card data provided by{" "}
          <a href="https://db.ygoprodeck.com/api-guide/" className="underline hover:text-white">
            YGOPRODeck
          </a>
        </p>
      </div>
    </footer>
  )
}

