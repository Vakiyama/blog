{
    description = "A very basic flake with dream";

    inputs = {
        nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
        opam-nix.url = "github:tweag/opam-nix";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = { nixpkgs, ... }:
    let
        systems = [ "x86_64-darwin" "aarch64-darwin" "x86_64-linux" ];

        createDevShell = system:
        let
            pkgs = import nixpkgs { inherit system; };
            dream-deps = with pkgs; [
                    pkg-config
                    openssl
            ];
        in
            pkgs.mkShell {
                buildInputs = with pkgs; [
                    dune_3
                    ocaml
                    ocamlformat
                    opam
                    libev
                ] ++ dream-deps;

                shellHook = ''
                    eval $(opam env)    
                '';
            };
    in {
        devShell = nixpkgs.lib.genAttrs systems createDevShell;
    };
}


