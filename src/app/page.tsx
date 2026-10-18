import fs from "node:fs";
import path from "node:path";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectIndex from "@/components/ProjectIndex";
import About from "@/components/About";
import Contact from "@/components/Contact";

// Drop a photo named roberto.jpg (or .png / .webp) into /public and it fills the arch in the hero.
function findPhoto() {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", `roberto.${ext}`))) return `/roberto.${ext}`;
  }
  return null;
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero photo={findPhoto()} />
        <ProjectIndex />
        <About />
        <Contact />
      </main>
    </>
  );
}
