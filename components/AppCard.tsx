export interface AppCardProps {
  name: string;
  path: string;
  description: string;
  imgPath: string;
}
export function AppCard(props: { app: AppCardProps }) {
  const { app } = props;
  return (
    <div class="border rounded-lg gray-200">
      <a class="sm:col-span-2" href={app.path}>
        <div class="flex">
          <div>
            <img src={app.imgPath} class="rounded-bl-lg rounded-tl-lg mr-2 max-h-24 max-w-24 md:max-h-28 md:max-w-28"/>
          </div>
          <div class="p-1 flex items-center">
            <div>
              <h3 class="text-xl md:text-2xl text-gray-900 font-bold">
                {app.name}
              </h3>
              <div class="mt-1 md:mt-2 text-sm md:text-md text-gray-900">
                {app.description}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}