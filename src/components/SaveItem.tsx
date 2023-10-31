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
      {/* <form
        hx-post="/view/inputtest"
        hx-target="next .new-item"
        hx-swap="beforebegin"
        // _="on htmx:afterRequest reset() me"
        class="mb-4"
      >
        <div class="mb-2">
          <input
            name="title"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
          />
        </div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center"
          type="submit"
        >
          Submit
        </button>
      </form> */}
      <form
        hx-post="/view/input"
        hx-target="next .new-item"
        hx-swap="outerHTML"
        // hx-on:submit={html`
        hx-on={html`htmx:beforeRequest: var inputHtml =
        document.getElementById("render").innerHTML;
        document.getElementById("hiddenInput").value = inputHtml;
        console.log(document.getElementById("hiddenInput").value) `}
      >
        {props.children}
        <input
          name="inputHtml"
          type="hidden"
          id="hiddenInput"
          value={props.children}
        />
        {/* <input name="inputHtml" type="text" /> */}
        <button type="submit">submit</button>
      </form>
    </>
  );
};
