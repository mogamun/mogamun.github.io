const path = require(`path`);
const fs = require(`fs`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const KIT_CATEGORIES = {
  data:   { emoji: '📊', label: '데이터', color: '#818cf8' },
  text:   { emoji: '📝', label: '텍스트', color: '#34d399' },
  encode: { emoji: '🔐', label: '인코딩', color: '#f472b6' },
  calc:   { emoji: '🧮', label: '계산기', color: '#fbbf24' },
  game:   { emoji: '🎮', label: '게임', color: '#f472b6' },
  tool:   { emoji: '🔧', label: '도구', color: '#818cf8' },
};
const KIT_CATEGORY_ORDER = ['data', 'text', 'encode', 'calc', 'game', 'tool'];

function parseKitMeta(content, filename) {
  const slug = filename.replace(/\.html$/, '');
  const title = content.match(/<meta\s+name="kit-title"\s+content="([^"]*)"/)?.[1]
    || content.match(/<title>([^<]*)<\/title>/)?.[1]
    || slug;
  const category = content.match(/<meta\s+name="kit-category"\s+content="([^"]*)"/)?.[1]
    || 'tool';
  const desc = content.match(/<meta\s+name="kit-description"\s+content="([^"]*)"/)?.[1]
    || '';
  const emoji = content.match(/<meta\s+name="kit-emoji"\s+content="([^"]*)"/)?.[1]
    || '📄';
  return { slug, title, category, desc, emoji, type: 'html' };
}

function scanKitTools() {
  const dir = path.join(__dirname, 'static', 'kit');
  if (!fs.existsSync(dir)) return [];

  const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  return htmlFiles.map(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    return parseKitMeta(content, f);
  });
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type !== `MarkdownRemark`) return;

  const fileNode = getNode(node.parent);
  const sourceInstance = fileNode && fileNode.sourceInstanceName;
  const isWiki = sourceInstance === 'wiki';
  const legalSlug = node.frontmatter && node.frontmatter.slug;

  if (legalSlug) {
    createNodeField({ node, name: `slug`, value: legalSlug });
    createNodeField({ node, name: `isWiki`, value: false });
  } else if (isWiki) {
    const slug = createFilePath({ node, getNode, basePath: `wiki` });
    createNodeField({ node, name: `slug`, value: `/wiki${slug}` });
    createNodeField({ node, name: `isWiki`, value: true });
  } else {
    const slug = createFilePath({ node, getNode, basePath: `contents` });
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `isWiki`, value: false });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              isWiki
            }
            frontmatter {
              layout
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, isWiki } = node.fields;

    if (isWiki) {
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/wiki-page.js`),
        context: { slug },
      });
    } else if (node.frontmatter.layout === 'legal') {
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/legal-page.js`),
        context: { slug },
      });
    } else {
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: { slug },
      });
    }
  });

  // Kit pages — auto-scan HTML + manual tools
  const manualTools = [];
  try {
    const { KIT_TOOLS } = require('./src/data/kit-tools');
    manualTools.push(...KIT_TOOLS);
  } catch (e) { /* no manual tools */ }

  const scannedTools = scanKitTools();

  // Merge: scanned tools override manual ones with same slug
  const allToolsMap = {};
  for (const t of manualTools) allToolsMap[t.slug] = t;
  for (const t of scannedTools) allToolsMap[t.slug] = t;
  const allTools = Object.values(allToolsMap);

  // Create individual kit pages
  for (const tool of allTools) {
    createPage({
      path: `/kit/${tool.slug}`,
      component: path.resolve(`./src/templates/kit-page.js`),
      context: { slug: tool.slug, tool },
    });
  }

  // Create kit index page with all tools data
  createPage({
    path: `/kit/`,
    component: path.resolve(`./src/templates/kit-index.js`),
    context: { tools: allTools, categories: KIT_CATEGORIES, categoryOrder: KIT_CATEGORY_ORDER },
  });
};
