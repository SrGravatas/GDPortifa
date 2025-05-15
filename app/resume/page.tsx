import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function Resume() {
  return (
    <div className="container py-8 md:py-12 max-w-screen-2xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>
        <Button className="mt-4 md:mt-0" asChild>
          <Link
            href="https://drive.google.com/file/d/1rO8gt6Fwx2gGpXGqd_WQe0Oz5Ic0vEx_/view?usp=sharing"
            target="_blank"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-card p-4 md:p-8 rounded-lg shadow-sm border">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Andre Fernandes Vargas</h2>
          <p className="text-muted-foreground mt-2">
            Experienced game designer with a passion for creating engaging player experiences
          </p>
        </div>

        <section className="mb-6 md:mb-8">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Professional Experience</h3>

          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="font-medium">Arvore VR Immersive Experiences</h4>
              <span className="text-muted-foreground text-sm md:text-base">04/2025 - Present</span>
            </div>
            <h5 className="font-medium text-primary">Senior Game Designer</h5>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground text-sm md:text-base">
              <li>Defined and clearly communicated the design vision across the team</li>
              <li>Led design teams, ensuring alignment with project goals and creative direction</li>
              <li>Mentored and supported junior designers, fostering their growth and development</li>
              <li>
                Identified and solved high-impact design problems to maintain the quality and coherence of the game
                experience
              </li>
              <li>
                Contributed to strategic project decisions, influencing priorities, scope, and overall product direction
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="font-medium">Arvore VR Immersive Experiences</h4>
              <span className="text-muted-foreground text-sm md:text-base">07/2022 - 03/2025</span>
            </div>
            <h5 className="font-medium text-primary">Game Designer Mid-Level</h5>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground text-sm md:text-base">
              <li>Designed levels for various games</li>
              <li>Developed and documented game mechanics for multiple projects</li>
              <li>Collaborated with a multidisciplinary team on RFPs for external clients</li>
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="font-medium">Kinship Entertainment</h4>
              <span className="text-muted-foreground text-sm md:text-base">08/2020 - 11/2021</span>
            </div>
            <h5 className="font-medium text-primary">Game Designer Associate</h5>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground text-sm md:text-base">
              <li>Had more autonomy while developing features</li>
              <li>Designed and documented new features for the game, such as a clan feature</li>
              <li>Designed and documented new Systems for the core mechanic of the game</li>
              <li>Designed new champions to the game, including their entire set of skills and mechanics</li>
              <li>Worked on balancing the game, following both player feedback and data retrieved from the database</li>
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="font-medium">Kinship Entertainment</h4>
              <span className="text-muted-foreground text-sm md:text-base">06/2020 - 08/2020</span>
            </div>
            <h5 className="font-medium text-primary">Game Designer Intern</h5>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground text-sm md:text-base">
              <li>Organized all documentation related to the project</li>
              <li>Worked close with other Game Designers in the Studio</li>
              <li>Had autonomy on minor tasks, such as developing building plans for the AI in the game</li>
            </ul>
          </div>
        </section>

        <section className="mb-6 md:mb-8">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Education</h3>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="font-medium">Anhembi Morumbi</h4>
              <span className="text-muted-foreground text-sm md:text-base">2016 - 2020</span>
            </div>
            <h5 className="font-medium text-primary">Bachelor of Game Design</h5>
          </div>
        </section>

        <section className="mb-6 md:mb-8">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Skills</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Design Skills</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm md:text-base">
                <li>Game mechanics design</li>
                <li>Level design</li>
                <li>Player experience design</li>
                <li>Game balancing</li>
                <li>VR/AR experience design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Technical Skills</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm md:text-base">
                <li>Unity</li>
                <li>Unreal Engine</li>
                <li>C#</li>
                <li>Blueprint Visual Scripting</li>
                <li>Adobe Creative Suite</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
