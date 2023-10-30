import { Hono } from "hono";
import { _TODOS } from "../commons/_TODO";
import { Render } from "../components/Render";
import { Sortable } from "../components/Sortable";
import { PostItem } from "../components/PostItem";

const viewRoute = new Hono();
viewRoute.get("/", (c) => {
  console.log("view: ", _TODOS);
  // const object = {
  //   user: ["<h1>hello</h1>", "<h1>hello</h1>"],
  // };
  // return c.html(<>{_TODOS}</>);
  const style = `
  .container { display: grid; grid-template-columns: 10% 90%; } 
  .container > :first-child {
  }
  `;

  return c.html(
    <html>
      <head>
        <style>{style}</style>
      </head>
      <body>
        <div>
          {!_TODOS.user || _TODOS.user.length === 0 ? (
            <div class='container'>
              <div>code</div>
              <div>_TODOS is empty now</div>
            </div>
          ) : (
            _TODOS.user.map((item, index) => (
              <>
                <div class='container'>
                  <div>code</div>
                  <div>
                    <PostItem />
                    <Sortable>
                      <Render item={item} index={index} />
                    </Sortable>
                  </div>
                </div>
              </>
            ))
          )}
          {/* {object.user.map((item, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
          ))} */}
        </div>
      </body>
    </html>
  );
});

export default viewRoute;
