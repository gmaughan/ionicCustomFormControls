# Issues with Custom Form Controls in Ionic

Sample project demonstrating issues with custom form controls in an Ionic list.

See [Ionic Feature Request 21903](https://github.com/ionic-team/ionic-framework/issues/21903).

Run with:

```sh
npm install
npm run start
```

`Not Working` tab contains a reactive form with three fields:

- Field 1 - simple text input
- Field 2 - Custom file input control
- Field 3 - simple text input

All three fields are required.

The custom file input control extends `lib/ValueAccessor` which is a modified clone of the Ionic `ValueAccessor` class. This tries to implement the presentation behaviour of in-built controls.

## Display issue

The first issue is that the custom control is not presented in the same way as the `ion` controls. The border at the bottom of the list item, under the label, is indented.

See `images/display-issue.png` in source.

## "Required" indicator issue

The second issue is that the custom control does not present the "required" indicators (red bottom border) for the custom control.

See `images/required-issue.png` in source.

Note: The "Choose a File" button must be clicked for Field 2 to be touched.

Hit submit to output the `form` to the console. You will notice that all three fields are `INVALID`.

## Working Tab

`Working` tab contains the same form with the `ion-item` containing the custom control modified to:

```html
<ion-item class="item-interactive" lines="none">
```

## Working (ionStyle) Tab

`Working (ionStyle)` tab contains the same form and has the `app-file-input` raise the `ionStyle` event during `onInit()`.
