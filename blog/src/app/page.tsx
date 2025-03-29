import Container from "@/app/_components/container";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  // React コンポーネントは props を受け取る必要がある。props は必ずオブジェクトである
  // そのため (skill: string) という形ではなく { skill: string } という形で受け取る
  const SkillComponent = ({ skill }: { skill: string }) => {
    return (
      <span className="mr-3 inline-block whitespace-nowrap pt-2">{skill}</span>
    );
  };

  const workSkills = [
    "💎 Golang",
    "☕ Java",
    "🏅 TypeScript (React)",
    "🐙 GitHub Actions",
    "🎋 Terraform",
    "🐳 Docker",
    "🍊 AWS",
    "🧊 GCP",
  ];

  const hobbies = ["♟️ Chess", "🍔 Hamburger", "🏝️ Traveling"];

  const WorkSkillSection = () => {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-bold">Work</h3>
        <div className="mb-4">
          {workSkills.map((skill) => (
            <SkillComponent key={skill} skill={skill} />
          ))}
        </div>
      </div>
    );
  };

  const HobbysSection = () => {
    return (
      <div>
        <h3 className="text-lg font-bold">Hobby</h3>
        <div className="mb-4">
          {hobbies.map((hobby) => (
            <SkillComponent key={hobby} skill={hobby} />
          ))}
        </div>
      </div>
    );
  };

  const MyIcon = () => {
    return (
      <img
        alt="avatar"
        loading="lazy"
        width="192"
        height="192"
        decoding="async"
        data-nimg="1"
        className="h-32 w-32 sm:h-48 sm:w-48 rounded-full"
        src="avatar.png"
        style={{ color: "transparent" }}
      ></img>
    );
  };

  const HeadingSection = () => {
    return (
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hi, I'm takamin55
          </h1>
          <h2 className="prose text-lg text-gray-600 dark:text-gray-400">
            A software engineer who likes beautiful CI/CD pipelines.
          </h2>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center space-x-2 xl:hidden">
          <img
            alt="avatar"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full"
            src="avatar.png"
            style={{ color: "transparent" }}
          ></img>
        </div>
      </div>
    );
  };

  return (
    <main className="mb-auto">
      <div className="flex flex-col items-center gap-x-12 xl:flex-row">
        <div className="max-w-3xl pt-6">
          <HeadingSection />
          <WorkSkillSection />
          <HobbysSection />
        </div>
        <div className="flex flex-col items-center space-x-2 pt-8 hidden xl:block">
          <MyIcon />
        </div>
      </div>
      <Container>
        <section className="mt-8">
          <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Blog.
          </h1>
        </section>
        <MoreStories posts={allPosts} />
      </Container>
    </main>
  );
}
