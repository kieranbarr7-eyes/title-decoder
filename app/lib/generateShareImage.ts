export async function generateShareImage(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  // html2canvas is browser-only and ~50KB — dynamic import keeps it out of
  // the initial bundle and only loads when the user clicks share.
  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: 1,
    useCORS: true,
    logging: false,
    width: 1200,
    height: 1200,
    windowWidth: 1200,
    windowHeight: 1200,
  });

  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
