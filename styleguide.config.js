module.exports = {
  components: 'src/features/Figtree/components/**/*.js',
  sections:[
    {
      name:"Plots",
      components: ["src/components/Plots/*.js","src/components/Plots/Elements/Element.js"],
    },
    {
      name:"Decorations",
      components: "src/components/decorations/*.js",
      sections:[
        {
          name:"Legends",
          components: "src/components/decorations/Legend/*.js",
          ignore:"src/components/decorations/Legend/ColorRamp.js"
        },
        {
          name:"Axis",
          components: "src/components/decorations/Axis/*.js",
        },
      ]
    },

    {
      name:"FigTree",
      components: "src/features/Figtree/components//Figtree/*.tsx",
      ignore:"src/components/Timeline.js"
    },

    {
      name:"Baubles",
      components: "src/components/Figtree/Baubles/*.js"
    },


    ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
};
