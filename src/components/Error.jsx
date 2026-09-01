export default function Error({ error }) {
  return (
    <div className="error">
      <h1 style={{color: "red"}}>{error}...</h1>
      <button onClick={(e) => window.location.reload()}>Reload</button>
    </div>
  )
}