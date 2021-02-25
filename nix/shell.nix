{ sources ? import ./sources.nix
, pkgs ? import sources.nixpkgs {}
}:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_latest
    pkgs.yarn

    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
