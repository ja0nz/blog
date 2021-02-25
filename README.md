- [Ja▲nz Blog](#sec-1)
  - [Build tools](#sec-1-1)
  - [Scripts](#sec-1-2)


# Ja▲nz Blog<a id="sec-1"></a>

-   [Eleventy static site generator](https://www.11ty.dev/)
-   [Eleventy high performance blog](https://github.com/google/eleventy-high-performance-blog)

## Build tools<a id="sec-1-1"></a>

-   [Nix-project scaffolding](https://github.com/shajra/nix-project)
-   direnv
-   lorri

## Scripts<a id="sec-1-2"></a>

-   `docs-generate`
-   `dependencies-upgrade`

Both are typically run with no arguments. `docs-generate` will generate Markdown files from Emacs Org-mode files. `dependencies-upgrade` as its name implies, updates the dependencies.

`docs-generate` is configured to execute source blocks. The result will be written to the Org-mode files in-place, as well as included in the exported Markdown.
