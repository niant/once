# Once CSS library

[![Join the chat at https://gitter.im/niant/once](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/niant/once?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/niant/once.png?branch=master)](https://travis-ci.org/niant/once) [![devDependency Status](https://david-dm.org/niant/once/dev-status.svg?theme=shields.io)](https://david-dm.org/niant/once#info=devDependencies)

Once CSS library solves the headache of repetitive CSS. We have adopted best practices from OOCSS and Atomic CSS. The goal is to write the basic widely used classes once and not repeat yourself (DRY). Basically one class does one job.

Library is using SASS, but you can use pure CSS files also. We are planning to modularize project to small modules - so that you can pick only what you need (e.g. typography, grid, spacers...)

___Note!___ Project is still under heavy development

## Documentation

### Naming policies 

#### Class prefixes

* P = Padding
* M = Margin
* B = Border
* f = Font/typography
* o = Overflow
* a = Animation
* c = Color (e.g. c-white)
* bg = Background (e.g. bg-c-white)
* r = Reactive classes (e.g. r-sm-left)

#### Size pre/postfixes

* ```xs, sm, md, lg, xl``` = Responsive classes ```xs-12 md-10 lg-6```

#### Direction abbreviation

* t: (top)
* r: (right)
* e: (end - right)
* b: (bottom)
* l: (left)
* s: (start - left)
* x: (left, right)
* y: (top, bottom)
* (empty): (top, right, bottom, left)

#### Other naming policies

``` [property][direction]-[feature]-[value]_[attribute] ```

* Uppercase prefix characters if it has direction
* 0 = Make element property size of zero ```.Mt-0 { margin-top:0; }```
* Reactive/responsive classes have a prefix of reactive breakpoint ```r-xs-, r-sm-, r-md-, r-lg, r-xl- ```

#### Examples of elements

```scss
.Pt-xs {
  padding-top: 0.5em;
}

.B-sm {
  border-top: 1em;
  border-right: 1em;
  border-bottom: 1em;
  border-left: 1em;
}

@media (min-width: 480px) {
  .r-sm-left {
    float: left;
  }
}
```

#### Examples of HTML with multiple classes

```html
<!-- Option 1: sizes with xs, sm, md, lg, xl -->
<div class="left P-md B-xs r-md-right">
    <h4 class="F-gamma My-md">Example</h4>
    <div class="Px-sm Pt-sm F-zeta r-md-Px-md r-md-Pt-md">Content</div>
</div>

<!-- Option 2: Same as 2nd except removing r- prefix from reactive classes -->
<div class="left P-md B-xs md-right">
    <h4 class="F-gamma My-md">Example</h4>
    <div class="Px-sm Pt-sm F-zeta md-Px-md md-Pt-md">Content</div>
</div>

```

## Changelog

### v0.3.0
* $baseColors variable in _variables.scss is renamed to $colors

### v0.2.0

* box direction is changed to empty string, so Pbox, Mbox etc. becomes just P and M
* Add support for node-sass versions (3.3.3) 

### v0.1.0

* Basic theme support (c-color, bg-c-color, B-c-color)
    - New atom and configuration: atoms/_theme-base.scss & $baseColors in _variables.scss
    - f-blank is now deprecated
    - Add support by adding blank into $baseColors and adding ```@include createMultipleSelectors('f-{key}', $baseColors, 'color');``` to your project


## Development environment setup

1. Clone Once to your desired location:
    git clone https://github.com/niant/once.git destination/
2. Download & install Node.js
3. Run: npm install
4. Start coding: npm start
