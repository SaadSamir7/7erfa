import Header from "@/components/landingPage/Header";
import Hero from "@/components/landingPage/Hero";
import About from "@/components/landingPage/About";
import Services from "@/components/landingPage/Services";
import SliderGallery from "@/components/landingPage/SliderGallery";
import Team from "@/components/landingPage/Team";
import Footer from "@/components/landingPage/Footer";

function LandingPage() {
    return (
        <>
            <Header />
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

export default LandingPage;
