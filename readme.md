# Once CSS library

[![Join the chat at https://gitter.im/niant/once](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/niant/once?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/niant/once.png?branch=master)](https://travis-ci.org/niant/once) [![devDependency Status](https://david-dm.org/niant/once/dev-status.svg?theme=shields.io)](https://david-dm.org/niant/once#info=devDependencies)

Once CSS/SASS library solves the headache of repetitive CSS. We have adopted best practices from OOCSS and atomic/functional CSS. The goal is to write the basic widely used classes once for everyone to use and not repeat yourself. Basically one class does one specific job but can do multiple CSS properties.

## Documentation

### Install

```npm install once-css```

Or just download a release [(https://github.com/niant/once/releases)](https://github.com/niant/once/releases)

**CSS usage**

Import either css/main.css or css/main.min.css to your project

**SASS usage**

Import .scss files you need from sass/ directory in your projects SCSS. If you like to use all the features - you can import sass/main.scss or copy content from sass/main.scss into your project.

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
    <h4 class="f-gamma My-md">Example</h4>
    <div class="Px-sm Pt-sm f-zeta r-md-Px-md r-md-Pt-md">Content</div>
</div>

```

### Functions & Mixins

#### ```@function multipleDefinitions($selectorPrefix, $selectorNamesAndPropertyValues, $properties)```

Create multiple class definitions in a map. For example:


```scss
multipleDefinitions('f', (sm: 0.7em, md: 1.2em, lg: 2.5em), ('font-size'));

/*
(
  f-sm: (font-size: 0.7em),
  f-md: (font-size: 1.2em),
  f-lg: (font-size: 2.5em)
)
 */
```


## Changelog

### v0.3.0

* New features
  * Responsive classes are created with createResponsiveClasses mixin.
  * Responsive _layout.scss classes
  * Responsive _typography.scss classes
  * Added a function for generating multiple definitions ```@function multipleDefinitions```
  * Flexbox classes added _flex.scss
  * Added _deprecated.scss for deprecated features
  * $responsiveClassScheme added to _variables.scss for freedom to specify the syntax of responsive classes. The default syntax is ```r-{breakpoint}-{selector}```.

* Changes from v0.2.0
  * $baseColors variable in _variables.scss is renamed to $colors
  * reactiveClasses mixin is renamed to createResponsiveClasses and its parameters are now ```$definitions, $_responsiveClassScheme: $responsiveClassScheme, $_breakpoints: $breakpoints``

* Deprecated features
  * .flex-column
  * .flex-lock
  * .flex-flex
  * .clearfix
  * _breakpoints.scss has been deleted and relevant functions moved into _functions.scss
  * _typography_responsive.scss deleted: responsive typography is now generated the same as all the other styles. See typography.scss

### v0.2.0

* box direction is changed to empty string, so Pbox, Mbox etc. becomes just P and M
* Add support for node-sass versions (3.3.3) 

### v0.1.0

* Basic theme support (c-color, bg-c-color, B-c-color)
    - New atom and configuration: atoms/_theme-base.scss & $baseColors in _variables.scss
    - f-blank is now deprecated
    - Add support by adding blank into $baseColors and adding ```@include createMultipleSelectors('f-{key}', $baseColors, 'color');``` to your project


## Development environment setup (for Once development)

1. Clone Once to your desired location:
    git clone https://github.com/niant/once.git destination/
2. Download & install Node.js
3. Run: npm install
4. Start coding: npm start
