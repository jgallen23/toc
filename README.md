# TOC ![npm](https://img.shields.io/npm/v/@firstandthird/toc.svg)

TOC is a library that will automatically generate a table of contents for your page.

## Features

- Completely customizable
- Click to smooth scroll to that spot on the page
- Automatically highlight the current section
- Can have multiple on a page

## Installation

```sh
npm install import '@firstandthird/toc'
```

## Usage

Import required scripts:

```javascript
import '@firstandthird/toc';
// or
import Toc from '@firstandthird/toc';
```

Setup HTML:

```html
<div class="toc" data-toc="h1">

<h1 data-toc-title="Heading 1">My heading</h1>
```

## Options

Options are set via custom properties:

| Property | Value | Description |
|---|---|---|
| `data-toc` | *{string\|Element\|NodeList}* | Elements to use as headings |
| `data-toc-container` | *{string\|Element\|NodeList}* | Element to find all selectors in |
| `data-toc-offset` | *{string\|Element\|NodeList}* | Offset to trigger the next headline |
| `data-toc-title` | *{string}* | Text to be used as title (add this to headings) |

## Example

Example HTML:

```html
<!DOCTYPE HTML>
<html>
  <head>
    <title>TOC Example</title>
    <link href="styles.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div class="toc" data-toc="h1, h2, h3"></div>

    <div id="wrapper">
      <h1 data-toc-title="Custom toc title">Page Title</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <h2>Sub Heading</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <h2>Sub Heading</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <h3 id="last" data-toc-title="Custom subsub-heading">SubSub Heading</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
    </div>
    <script src="scripts.js"></script>
  </body>
</html>
```

Example JavaScript:

```javascript
import '@firstandthird/toc';
```

Example CSS:

```css
.toc {
    background: #fefefe;
    width: 200px;
    position: fixed;
    border: 1px solid #ddd;
    color: #333;
}
.toc a {
    color: #333;
}
.toc .toc-h2 {
    margin-left: 10px
}
.toc .toc-h3 {
    margin-left: 20px
}
.toc-visible {
    color: #000;
    font-weight: bold;
}
.toc.right {
    right: 0
}
```

## License

### MIT License

Copyright (c) 2018 First+Third

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
