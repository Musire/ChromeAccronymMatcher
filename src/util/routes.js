export const nestLayouts = (routes, isRoot = true) => {
  // Find the layout route
  const layoutIndex = routes.findIndex(
    (r) => r.path === "layout" || r.path === "_layout"
  );

  if (layoutIndex === -1) {
    // No layout here, recurse into children if any
    return routes.map((r) => {
      if (r.children) {
        r.children = nestLayouts(r.children, false);
      }
      return r;
    });
  }

  // Get layout and make it the parent
  const layout = { ...routes[layoutIndex] };
  layout.path = isRoot ? "/" : "";

  // Everything else becomes a child of the layout
  const children = routes.filter((_, i) => i !== layoutIndex).map((r) => {
    if (r.children) {
      r.children = nestLayouts(r.children, false);
    }
    return r;
  });

  layout.children = nestLayouts(children, false); // Recursively handle nested layouts

  return [layout];
}