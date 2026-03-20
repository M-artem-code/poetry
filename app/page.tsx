import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import PromoSection from '@/components/PromoSection/PromoSection'
import AboutBelarusSection from '@/components/AboutBelarusSection/AboutBelarusSection'
import AuthorsSection from '@/components/AuthorsSection/AuthorsSection'
import AllAuthorsSection from '@/components/AllAuthorsSection/AllAuthorsSection'
import CardsSlider from '@/components/CardsSlider/CardsSlider'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <PromoSection />
      <AboutBelarusSection />
      <AuthorsSection />
      <AllAuthorsSection />
      <CardsSlider />
    </main>
  )
}
