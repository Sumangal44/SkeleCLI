import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold">Build Stunning UIs with ShadCN</h1>
        <p className="text-lg text-gray-600 mt-4">The modern UI component library for React & TypeScript.</p>
        <Button className="mt-6 px-6 py-2 text-lg">Get Started</Button>
      </section>
    </div>
  );
}
