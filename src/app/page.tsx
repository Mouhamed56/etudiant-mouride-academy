'use client'
import { LangProvider } from '@/hooks/useLang'
import Navbar       from '@/components/Navbar'
import Chatbot      from '@/components/Chatbot'
import Hero         from '@/sections/Hero'
import About        from '@/sections/About'
import Institut     from '@/sections/Institut'
import Teachings    from '@/sections/Teachings'
import Khassaides   from '@/sections/Khassaides'
import Evenements   from '@/sections/Evenements'
import Khalifes     from '@/sections/Khalifes'
import CarteSerigne from '@/sections/CarteSerigne'
import Videos       from '@/sections/Videos'
import Podcast      from '@/sections/Podcast'
import Book         from '@/sections/Book'
import Xassida      from '@/sections/Xassida'
import Library      from '@/sections/Library'
import Mission      from '@/sections/Mission'
import Economy      from '@/sections/Economy'
import Actualites   from '@/sections/Actualites'
import Blog         from '@/sections/Blog'
import Quotes       from '@/sections/Quotes'
import Gallery      from '@/sections/Gallery'
import Newsletter   from '@/sections/Newsletter'
import Testimonials from '@/sections/Testimonials'
import Contact      from '@/sections/Contact'
import Footer       from '@/sections/Footer'

export default function HomePage() {
  return (
    <LangProvider>
      <div style={{ fontFamily:"'Poppins',sans-serif" }}>
        <Navbar />
        <Chatbot />
        <main>
          <Hero />
          <About />
          <Institut />
          <Teachings />
          <Khassaides />
          <Evenements />
          <Khalifes />
          <CarteSerigne />
          <Videos />
          <Podcast />
          <Book />
          <Xassida />
          <Library />
          <Mission />
          <Economy />
          <Actualites />
          <Blog />
          <Quotes />
          <Gallery />
          <Newsletter />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  )
}
