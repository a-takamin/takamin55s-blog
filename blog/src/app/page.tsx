import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main className="mb-auto">
      <div className="flex flex-col items-center gap-x-12 xl:flex-row">
        <div className="max-w-3xl pt-6">
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
                style={{color: "transparent"}}
              >
              </img>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold">Work</h3>
            <div className="mb-4">
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                💎 Golang
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                ☕ Java
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🏅 TypeScript
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🐈‍⬛ GitHub Actions
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🎋 Terraform
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🐳 Docker
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🍊 AWS
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🧊 GCP
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Hobby</h3>
            <div className="mb-4">
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                ♟️ Chess
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🍔 Hamburger
              </span>
              <span className="mr-3 inline-block whitespace-nowrap pt-2">
                🏝️ Traveling
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-x-2 pt-8 hidden xl:block">
          <img
            alt="avatar"
            loading="lazy"
            width="192"
            height="192"
            decoding="async"
            data-nimg="1"
            className="h-32 w-32 sm:h-48 sm:w-48 rounded-full"
            src="avatar.png"
            style={{color: "transparent"}}
          >
          </img>
        </div>
      </div>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
