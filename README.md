# Recedit

Recedit is a web application that allows you to create rectangles and other polygons inside
an HTML canvas in your browser.

It is written in Typescript and uses custom methods for drawing lines using the Bresenham's algorithm.

# Installation

``` bash
$ yarn install
```

If you do not have _yarn_, use _npm_ instead.


# Building

Please use `yarn build:dev` or `yarn build:prod` depending on the environment that the application
is being built for. This will perform a full rebuild of the application
using Webpack.

The result will be in the `dist` directory.


# Development

## Webpack-dev-server

The most convenient way to develop the application is using the `webpack-dev-server`. It performs incremental rebuilds whenever source code changes and automatically refreshes the page, so you do not have to.

To start the server, execute the following command in your terminal:

``` bash
$ yarn start
```

Then open the URL that appeared in the console. Usually it's [http://localhost:8080](http://localhost:8080).


## Watch mode

If you prefer to use your own HTTP server you can use the _watch mode_.

When using the watch mode, the application is rebuilt (just like `yarn build:dev` or `yarn build:prod`) upon every change detected in the source code.

It is superior to running those commands yourself after every change because it uses the cache to store parts of the application that did not change.


To use the _watch mode_, execute one of the commands below depending on the environment:

``` bash
$ yarn watch:dev
$ yarn watch:prod
```


# Author

The author of this project is [Grzegorz Rozdzialik](voreny.gelio@gmail.com).
