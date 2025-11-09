const NavBar = ({ setTestTime, setTestType, setWordLimit }) => {
  const handleClick = (type, value) => {
    if (type === "wordLimit") {
      setTestType(type);
      setWordLimit(value);
    } else if (type === "timedTest") {
      setTestType("timedTest");
      setTestTime(value);
    }
  };
  return (
    <div className="max-w-5xl mx-auto font-jetbrainsmono justify-between bg-lightolive text-light flex p-2">
      <h1 className="bold">typer.</h1>
      <div className="flex gap-15">
        <ul className="flex flex-row gap-2">
          <li className="font-bold text-med">WORD LIMIT TEST</li>
          <li
            onClick={() => handleClick("wordLimit", 10)}
            className="hover:cursor-pointer"
          >
            10
          </li>
          <li
            onClick={() => handleClick("wordLimit", 25)}
            className="hover:cursor-pointer"
          >
            25
          </li>
          <li
            onClick={() => handleClick("wordLimit", 50)}
            className="hover:cursor-pointer"
          >
            50
          </li>
        </ul>

        <ul className="flex flex-row gap-2">
          <li className="font-bold text-med">TIMED TEST</li>
          <li
            onClick={() => handleClick("timedTest", 15)}
            className="hover:cursor-pointer"
          >
            15
          </li>
          <li
            onClick={() => handleClick("timedTest", 30)}
            className="hover:cursor-pointer"
          >
            30
          </li>
          <li
            onClick={() => handleClick("timedTest", 60)}
            className="hover:cursor-pointer"
          >
            60
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
