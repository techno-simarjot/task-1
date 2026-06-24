function Button({ label, onClick, className, type }) {
  const classes = [
    "calc-btn",
    type && type,
    className && className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} onClick={onClick} type="button">
      {label}
    </button>
  );
}

export default Button;
