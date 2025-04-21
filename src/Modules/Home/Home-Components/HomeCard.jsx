function HomeCard({ name, number, Icon }) {
  return (
    <div className="flex flex-col gap-4 justify-between items-center bg-main rounded-lg text-white py-3 px-4 shadow-md ">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        {Icon && (
          <Icon className="text-4xl shadow-md border border-main m-2 rounded-md" />
        )}
      </div>
      <p className="text-xl font-bold">{number}</p>
    </div>
  );
}

export default HomeCard;
