export const Render = ({ item, index }) => {
  return <div key={index} dangerouslySetInnerHTML={{ __html: item }}></div>;
};
