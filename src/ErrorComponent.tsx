export default function ErrorComponent(
  props
): React.ReactComponentElement<any> {
  return (
    <div>
      <p>there was an error while rendering the TreeVisualizer</p>
      <p>{props.text}</p>
    </div>
  );
}
