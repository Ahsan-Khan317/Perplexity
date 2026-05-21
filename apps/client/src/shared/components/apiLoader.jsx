import Skeleton from "react-loading-skeleton";

export const ApiLoader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 bg-black md:grid-cols-4 gap-4 p-4">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="  w-full">
            <Skeleton
              className="w-full"
              height={140}
              baseColor="black"
              highlightColor="grey"
              borderRadius={16}
            />
          </div>
        ))}
    </div>
  );
};
