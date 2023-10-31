import { html } from "hono/html";

export const SaveItem = (props) => {
  return (
    /**
     * send child components to server using post request
     * "render" id
     *
     */
    <>
      {/* // TODO: innerHTMLでidなどの属性も取得する必要あり */}
      <form
        hx-post="/view/input"
        hx-target="next .new-item"
        hx-swap="outerHTML"
        hx-on:submit={html`
          var inputHtml = document.getElementById("render").innerHTML;
          console.log(inputHtml); document.getElementById("hiddenInput").value =
          inputHtml; console.log(document.getElementById("hiddenInput").value)
        `}
      >
        <input name="inputHtml" type="hidden" id="hiddenInput" />
        {props.children}
        <button type="submit">submit</button>
      </form>
    </>
  );
};
