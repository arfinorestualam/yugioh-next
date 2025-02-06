export default function Footer() {
  return (
    <footer className="bg-indigo-800 text-indigo-100 py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 Yu-Gi-Oh! Card Gallery. All rights reserved.</p>
        <p className="mt-2 text-sm text-indigo-300">
          Card data provided by{" "}
          <a href="https://db.ygoprodeck.com/api-guide/" className="underline hover:text-white">
            YGOPRODeck
          </a>
        </p>
      </div>
    </footer>
  )
}

