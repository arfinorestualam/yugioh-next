import CardList from "@/components/CardList"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CardList />
      </main>
      <Footer />
    </div>
  )
}

