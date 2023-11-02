const Meta = (props) => {
  const style = `
      // .container { display: grid; grid-template-columns: 10% 90%; } 
  `;
  return (
    <html>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <style>{style}</style>
        <script src="https://unpkg.com/htmx.org@1.9.6"></script>
        {/* <script src="https://unpkg.com/hyperscript.org@0.9.12"></script> */}
      </head>
      <body>
        <div class="h-screen flex flex-col">
          <div id="header" class="h-[20%] bg-gray-200">
            <Header />
          </div>
          <div id="target"></div>
          <div class="flex-1 flex">
            <div id="sidebar" class="bg-gray-100 max-w-[20%] min-w-[10%]">
              <Side />
            </div>
            <div id="main" class="flex-1">
              {props.children}
            </div>
          </div>
          <div id="footer" class="h-[20%] bg-gray-200">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

const Header = () => <>header</>;
const Footer = () => <>footer</>;
const Side = () => <>side</>;

const ScriptElt = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        const menuButton = document.getElementById('menuButton');
        const sidebar = document.getElementById('sidebar');
        
        menuButton.addEventListener('click', () => {
          sidebar.classList.toggle('hidden');
        }); 
      `,
    }}
  ></script>
);

export default Meta;
