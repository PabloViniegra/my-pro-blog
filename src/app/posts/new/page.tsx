import Footer from '@/components/shared/Footer/Footer'
import Navbar from '@/components/shared/Navbar/Navbar'
import FormCreate from '@/components/posts/new/FormCreate'

export default async function NewPostPage() {
  return (
    <section>
      <Navbar />
      <FormCreate />
      <Footer />
    </section>
  )
}
