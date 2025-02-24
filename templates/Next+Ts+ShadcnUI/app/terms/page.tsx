import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 lg:py-16 text-left sm:text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none mx-auto">
          <p className="mb-4">Last updated: [Current Date]</p>
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">2. Use License</h2>
          <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on DesignerName&apos;s website for personal, non-commercial transitory viewing only.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
          <p className="mb-4">The materials on DesignerName&apos; s website are provided on an &apos;as is&apos; basis. DesignerName makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">4. Limitations</h2>
          <p className="mb-4">In no event shall DesignerName or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DesignerName&apos;s website, even if DesignerName or a DesignerName authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">5. Revisions and Errata</h2>
          <p className="mb-4">The materials appearing on DesignerName&apos;s website could include technical, typographical, or photographic errors. DesignerName does not warrant that any of the materials on its website are accurate, complete or current. DesignerName may make changes to the materials contained on its website at any time without notice.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">6. Governing Law</h2>
          <p className="mb-4">These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

