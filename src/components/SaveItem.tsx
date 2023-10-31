import { html } from "hono/html";

export const SaveItem = (props) => {
  const username = "user";

  return (
    <>
      <div
        hx-post="/view/input"
        hx-target="next .new-item"
        hx-swap="outerHTML"
        hx-on:click={html`
          var inputHtml = document.getElementById("render").innerHTML;
          document.getElementById("hiddenInput").value = inputHtml;
        `}
      >
        <input type="hidden" id="hiddenInput" name="inputHtml" />
        {props.children}
      </div>
    </>
  );
};
