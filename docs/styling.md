# Styling shark-ng-table

If you are using Angular CLI you can simply add the following to your styles.css:

```css
@import "~shark-ng-table/shark-ng-table.min.css";

/* Optionally, use Open Sans from Google to match our Plunker */
body {
  font-family: 'Open Sans', sans-serif;
}
```

We provide Font Awesome classes in the table, if you would like them to show up you will need to add the following to `index.html`:

```html
<link href="https://use.fontawesome.com/releases/v5.0.3/css/all.css" rel="stylesheet">
```

If you choose to use Open Sans, you will also need to add this line to index.html:

```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
```
