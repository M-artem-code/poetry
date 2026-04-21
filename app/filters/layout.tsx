import Header from '@/components/Header/Header'

export const metadata = {
  title: 'Фильтры | Poetry',
  description: 'Ваши фильтры стихотворений',
}

export default function FiltersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

