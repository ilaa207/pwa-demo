const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  publicPath: '/pwa-demo/',
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      }),
    ],
  },
});
/*
Cosa fa questa configurazione?
Mantiene le configurazioni esistenti:
transpileDependencies: ["vuetify"]: Continua a gestire le dipendenze come vuetify per il transpiling.
lintOnSave: false: Disabilita il linting in fase di salvataggio.
Aggiunge il supporto per il flag:
webpack.DefinePlugin definisce il flag __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ come false per ottimizzare il bundle di produzione.
*/