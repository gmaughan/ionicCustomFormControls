# Issues with Custom Form Controls in Ionic

Sample project demonstrating issues with custom form controls in an Ionic list.

Run with:

```sh
npm install
npm run start
```

Tab 1 contains a reactive form with three fields:

- Field 1 - simple text input
- Field 2 - Custom file input control
- Field 3 - simple text input

All three fields are required.

The custom file input control extends `lib/ValueAccessor` which is a modified clone of the Ionic `ValueAccessor` class. This tries to implement the presentation behaviour of in-built controls.

## Display issue

The first issue is that the custom control is not presented in the same way as the `ion` controls. The border at the bottom of the list item, under the label, is indented.

![Display issue](/images/display-issue.png "Display Issue")

## "Required" indicator issue

The second issue is that the custom control does not present the "required" indicators (red bottom border) for the custom control.

![Required issue](/images/required-issue.png "Required Issue")

Note: The "Choose a File" button must be clicked for Field 2 to be touched.

Hit submit to output the `form` to the console. You will notice that all three fields are `INVALID`.
