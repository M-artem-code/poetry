import Header from '@/components/Header/Header'

export const metadata = {
  title: 'Квест | Poetry',
}

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}

