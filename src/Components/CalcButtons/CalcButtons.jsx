const CalcButton = (props) => {
  return (
    <button className={"numeric" + " " + props.className} id={props.id} onClick={props.onClick}>
      {props.btnName}
    </button>
  );
};

export default CalcButton;
