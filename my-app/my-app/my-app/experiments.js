module.exports = {
  experiments: {
    // Example A/B test
    newHeroLayout: {
      name: 'New Hero Layout',
      description: 'A new layout for the hero section.',
      variants: {
        control: {
          weight: 0.5,
        },
        treatment: {
          weight: 0.5,
        },
      },
    },
  },
};
