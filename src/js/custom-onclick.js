addEventListener("click", async (e) => {
  const handler = e.target.closest("[on-click]");
  if (!handler) {
    return;
  }
  e.preventDefault();
  const name = handler.getAttribute("on-click");
  const onClickEvents = await import("./on-click.js");
  const fn = onClickEvents[name];
  if (!fn) {
    throw new Error("Unknown handler" + name);
  }
  fn(handler);
});
