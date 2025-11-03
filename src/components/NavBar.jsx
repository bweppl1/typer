const NavBar = ({ setTestTime }) => {
  const handleClick = (sec) => {
    setTestTime(sec);
  };
  return (
    <div className="max-w-5xl mx-auto font-jetbrainsmono color-light justify-between bg-lightolive text-white flex p-2">
      <h1 className="bold">typer.</h1>

      <ul className="flex flex-row gap-2">
        <li onClick={() => handleClick(15)}>15</li>
        <li onClick={() => handleClick(30)}>30</li>
        <li onClick={() => handleClick(60)}>60</li>
      </ul>
    </div>
  );
};

export default NavBar;
