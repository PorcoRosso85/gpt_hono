export const Render = ({ item, index }) => {
  return (
    <div
      id="render"
      key={index}
      dangerouslySetInnerHTML={{ __html: item }}
    ></div>
  );
};
