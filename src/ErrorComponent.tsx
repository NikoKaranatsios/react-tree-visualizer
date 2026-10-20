export default function ErrorComponent(
  props: { text?: string }
): React.ReactComponentElement<any> {
  return (
    <div>
      <p>there was an error while rendering the TreeVisualizer</p>
      <p>{props.text}</p>
    </div>
  );
}
