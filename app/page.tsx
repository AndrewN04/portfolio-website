import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero";
import { Rack } from "./components/rack";
import { StatusBar } from "./components/status-bar";
import { VmWindow } from "./components/vm-window";
import { CustomCursor } from "./components/custom-cursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="desk">
        <Navigation />
        <main id="main-content" className="desk-main" tabIndex={-1}>
          <HeroSection />
          <Rack />
        </main>
        <StatusBar />
      </div>
      <VmWindow />
    </>
  );
}
