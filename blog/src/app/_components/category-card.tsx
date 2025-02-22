export function CategoryCard(props: { category: string, height: string, width: string}) {
  const { category, height, width } = props;
  return (
    <div className={`relative ${height} ${width} border rounded-xl gray-200 flex-shrink-0`}>
      <a className="box-border" href={`categories/${category}`}>
        <div className="h-full w-full">
          <img src={`/categories/${category}.jpg`} className="w-full h-full object-cover rounded-xl absolute top-0 opacity-90"></img>
        </div>
        <div className={`flex flex-col justify-end p-4 rounded-xl text-lg absolute h-full w-full bottom-0 bg-gradient-to-t from-[rgba(253,187,116,0.25)]`}>
          <span className="text-white custom-text-outline">{category}</span>
        </div>
      </a>
    </div>
  );
}
