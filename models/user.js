class User {
  static async create ({ firstName, lastName, email, tel }) {
    try {
      const {
        rows: [createdUser],
      } = await User.pool.query(
        `
        INSERT INTO users (first_name, last_name, email, tel)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `,
        [firstName, lastName, email, tel]
      );
      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  static async getAll (limit, offset) {
    try {
      const query = `
        SELECT *
        FROM users
        ORDER BY id
        LIMIT $1 OFFSET $2
      `;
      const { rows } = await User.pool.query(query, [limit, offset]);

      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async getById (userId) {
    try {
      const query = `
        SELECT *
        FROM users
        WHERE id = $1;
      `;

      const {
        rows: [foundUser],
      } = await User.pool.query(query, [userId]);

      return foundUser;
    } catch (err) {
      throw err;
    }
  }

  static async updateById ({ firstName, lastName, email, tel }, userId) {
    try {
      const query = `
        UPDATE users
        SET first_name = $1, 
            last_name = $2,
            email = $3,
            tel = $4
        WHERE id = $5
        RETURNING *
        ;    
      `;

      const {
        rows: [updatedUser],
      } = await User.pool.query(query, [
        firstName,
        lastName,
        email,
        tel,
        userId,
      ]);

      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  static async deleteById (userId) {
    try {
      const query = `
        DELETE FROM users
        WHERE id = $1
        RETURNING 1;
      `;

      const {
        rows: [foundUser],
      } = await User.pool.query(query, [userId]);

      return foundUser;
    } catch (err) {
      throw err;
    }
  }

  static async getPhonesByUserId (userId, brand, startDate, endDate) {
    try {
      let query = `
        SELECT phones.*
        FROM phones
        JOIN users_phones ON phones.id = users_phones.id
        WHERE users_phones.user_id = $1
      `;
      const params = [userId];

      if (brand) {
        query += ` AND phones.brand = $2`;
        params.push(brand);
      }

      const { rows } = await User.pool.query(query, params);
      return rows;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
