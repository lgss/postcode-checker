module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'work',
      overrideEndpoint: false,
      region: 'eu-west-2',
      bucket: 'local-lockdown-editor',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5
    }
  }
}
