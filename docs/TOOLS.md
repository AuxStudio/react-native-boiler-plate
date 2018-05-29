# Tools

## Generating assets

1.  Save source icon to `./design/icon.png`. It should be > 1024 x 1024 px.
2.  Save source splash image to `./design/splash.png`. It should be > 2208 x 2208 px with a 30% margin.

```shell
npm install -g generator-rn-toolbox
yo rn-toolbox:assets --icon ./design/icon.png --splash ./design/splash.png --store
yo rn-toolbox:assets --android-notification-icon ./design/icon.png
```

Done! Store assets will be saved to the root folder.
