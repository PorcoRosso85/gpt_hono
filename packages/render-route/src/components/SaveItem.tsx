import { html } from "hono/html";

export const SaveItem = (props) => {
  return (
    /**
     * send child components to server using post request
     * "render" id
     *
     */
    <>
      <form
        hx-post={`${props.route}/input`}
        hx-target=".new-item"
        hx-swap="outerHTML"
      >
        <button type="submit">submit</button>
        {props.children}
        <input
          name="inputHtml"
          type="hidden"
          id="hiddenInput"
          value={props.children}
        />
      </form>
    </>
  );
};
