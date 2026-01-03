import Header from "@/components/landingPage/Header";
import Hero from "@/components/landingPage/Hero";
import About from "@/components/landingPage/About";
import Services from "@/components/landingPage/Services";
import SliderGallery from "@/components/landingPage/SliderGallery";
import Team from "@/components/landingPage/Team";
import Footer from "@/components/landingPage/Footer";
import { auth } from "@/auth";

export default async function LandingPage() {
    const session = await auth();
    const user = session?.user;

    return (
        <>
            <Header user={user} />
            <main>
                <Hero />
                <About />
                <Services />
                <SliderGallery />
                <Team />
            </main>
            <Footer />
        </>
    );
}
