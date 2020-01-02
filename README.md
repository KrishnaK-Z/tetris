# Tetris
Developed in ES6. Followed [http://tetris.wiki](http://tetris.wiki)

# New Features!

- Added extra style for score board
- Added the ghost block

### Tech

Technology used here are:

* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system

### Installation

Install the dependencies and devDependencies.

```sh
$ cd Tetris
$ npm install -d
$ gulp
```

### Development

sass to css:
```sh
$ gulp scss
```

minify css
```sh
$ gulp mincss
```

bundle the js files into a single file
```sh
$ gulp bundlejs
```

for live changes
```sh
$ gulp watch
```

for development purpose
```sh
$ gulp
```

### Todos

 - Bugs in Ghost block
 - Bugs in collision detection