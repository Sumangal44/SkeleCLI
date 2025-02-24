import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 lg:py-16 text-left sm:text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none mx-auto">
          <p className="mb-4">Last updated: [Current Date]</p>
          <p className="mb-4">DesignerName (&quot;us&quot;&ldquo; &quot;we&quot;&ldquo; or &quot;our&quot;) operates [Your Website URL] (the &quot;Site&quot;). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">Information Collection And Use</h2>
          <p className="mb-4">While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name, email address, and phone number (&quot;Personal Information&quot;).</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">Log Data</h2>
          <p className="mb-4">Like many site operators, we collect information that your browser sends whenever you visit our Site (&quot;Log Data&quot;). This Log Data may include information such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">Cookies</h2>
          <p className="mb-4">Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer&apos;s hard drive. Like many sites, we use &quot;cookies&quot; to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">Security</h2>
          <p className="mb-4">The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">Changes To This Privacy Policy</h2>
          <p className="mb-4">This Privacy Policy is effective as of [Current Date] and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
