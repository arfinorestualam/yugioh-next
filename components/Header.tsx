import SortControls from "./SortControls"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-4 text-center">Yu-Gi-Oh! Card Gallery</h1>
        <SortControls />
      </div>
    </header>
  )
}

