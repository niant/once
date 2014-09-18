# Once CSS library

[![Build Status](https://travis-ci.org/niant/once.png?branch=master)](https://travis-ci.org/niant/once)

[![devDependency Status](https://david-dm.org/niant/once/dev-status.svg?theme=shields.io)](https://david-dm.org/niant/once#info=devDependencies)


Once CSS library solves the headache of repetitive CSS. We have adopted best practices from OOCSS and Atomic CSS. The goal is to write the basic widely used classes once and not repeat yourself (DRY).

___Note!___ Project is still under heavy development, we don't recommend using it in production yet!


## Modularization

After the initial heavy development mode, we are planning to modularize project to small modules - so that you can pick only what you need (e.g. typography, grid, spacers...)

## Preprocessors

Currently we're supporting SASS, but plan is to support LESS also

## Recommendations

It's recommended to use normalize.css with Once.

## Development environment setup

1. Clone Once to your desired location:

    git clone https://github.com/niant/once.git destination/
2. Download & install Node.js
3. Run: npm install
4. Start coding: npm start

## Documentation

[Detailed documentation](docs/index.html) is still incomplete but it gives you a hunch of what we are doing.

### Naming policies (working draft, most likely to be changed)

#### Class prefixes

* P = Padding
* M = Margin
* B = Border
* F = Font
* O = Overflow
* A = Animation

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
* xy: (top, right, bottom, left)

#### Other naming policies

* 0 = Make element property size of zero ```.Mt-0 { margin-top:0; }```
* Reactive/responsive classes have a prefix of reactive breakpoint ```r-xs-, r-sm-, r-md-, r-lg, r-xl- ```

#### Examples of elements

```scss
.Pt-xs {
  padding-top: 0.5em;
}

.Bxy-sm {
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
<div class="left Pxy-md Bxy-xs r-md-right">
    <h4 class="F-gamma My-md">Example</h4>
    <div class="Px-sm Pt-sm F-zeta r-md-Px-md r-md-Pt-md">Content</div>
</div>

<!-- Option 2: Same as 2nd except removing r- prefix from reactive classes -->
<div class="left Pxy-md Bxy-xs md-right">
    <h4 class="F-gamma My-md">Example</h4>
    <div class="Px-sm Pt-sm F-zeta md-Px-md md-Pt-md">Content</div>
</div>

```