export default function Default({title, text}) {
  return (
    <div className="default">
      <span className="default__title">{title}</span>

      <p>
        {text}
      </p>
    </div>
  );
}
