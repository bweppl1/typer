const NavBar = ({ setTestTime }) => {
  const handleClick = (sec) => {
    setTestTime(sec);
  };
  return (
    <div className="max-w-5xl mx-auto font-jetbrainsmono justify-between bg-lightolive text-light flex p-2">
      <h1 className="bold">typer.</h1>

      <ul className="flex flex-row gap-2">
        <li className="font-bold text-med">TIME</li>
        <li onClick={() => handleClick(15)} className="hover:cursor-pointer">
          15
        </li>
        <li onClick={() => handleClick(30)} className="hover:cursor-pointer">
          30
        </li>
        <li onClick={() => handleClick(60)} className="hover:cursor-pointer">
          60
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
