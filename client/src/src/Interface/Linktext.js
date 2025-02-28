
export default function LinkText({children, popup, color, outline}) {
  if (color === null) {
    color = 'cardinal';
  }
  const classes = [
    "linktext--text",
    color,
    outline ? 'outline' : '',
  ].join(' ').trim();
  return (
    <span className="linktext">
      <span className={ classes }>{ children }</span>
      <span className="linktext--popup">{ popup }</span>
    </span>
  )
}
