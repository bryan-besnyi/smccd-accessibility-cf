const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const canvasTemplate = path.resolve(`./src/templates/post.js`);

  return graphql(`
    {
      allContentfulCanvasDocs {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allContentfulCanvasDocs.edges.forEach(edge => {
      createPage({
        path: `/canvas/${edge.node.slug}`,
        component: canvasTemplate,
        context: {
          slug: edge.node.slug
        }
      });
    });
  });
};
