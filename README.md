# sharp-cli

Simple CLI for [sharp](https://sharp.pixelplumbing.com/).

## Installation

Git clone.

```sh
npm link
```

## Usage

```sh
sharp myimage.jpg myimage.webp
```

Uses `sharp.toFile` that means the output format will be inferred from the extension.
