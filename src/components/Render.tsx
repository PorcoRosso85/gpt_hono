export const Render = ({ item, index }) => {
  return (
    <div
      class="render"
      key={index}
      id={index}
      dangerouslySetInnerHTML={{ __html: item }}
    ></div>
  );
};
