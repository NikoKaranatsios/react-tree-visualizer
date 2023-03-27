module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tree-visualizer": {
          "node-bg": "#f5f5f5",
          "node-border": "#e0e0e0",
          "node-text": "#000000",
          "node-hover-bg": "#e0e0e0",
          "node-hover-border": "#bdbdbd",
          "node-hover-text": "#000000",
          "node-selected-bg": "#bdbdbd",

          "link-line": "#bdbdbd",
          "link-hover-line": "#9e9e9e",
          "link-selected-line": "#757575",

          "node-leaf-bg": "#f5f5f5",
          "node-leaf-border": "#e0e0e0",
          "node-leaf-text": "#000000",
          "node-leaf-hover-bg": "#e0e0e0",
        },
      },
    },
  },
  plugins: [],
};
