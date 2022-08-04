'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'Sequelize this motherfucker',
          content:
            'In this episode, Wulfshade starts to finally grasp sequelize and is readying himself to fight back.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Guilty by Association',
          content:
            'In this episode, Wulfshade learns how to associate two models together in a one-to-many relation.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {
      truncate: true,
      cascade: true,
    });
  },
};
